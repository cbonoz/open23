'use client'

import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Steps, Result, Divider, Checkbox, Card, Image } from "antd";
import { listingUrl, ipfsUrl, getExplorerUrl, humanError, isEmpty, } from "../util";
import { uploadFiles } from "../util/stor";
import TextArea from "antd/lib/input/TextArea";
import { ACTIVE_CHAIN, APP_NAME } from "../constants";
import { generateItem } from "../constants";
import { FileDrop } from "./FileDrop";
import { createListing } from "../util/tableland";
import { ethers } from "ethers";
import { deployContract } from "../util/listingContract";
import { useWallet } from "./WalletProviderWrapper";

const { Step } = Steps;

function CreateListing() {
  const { connect, provider, wallet, logout } = useWallet()


  //   useEffect(() => {
  //     const networkId = network?.chain?.id
  //     console.log('network', network)
  //     if (networkId) {
  //       refetch()
  //     }
  //   }, [network, account])

  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const setDemo = () => setData({ ...generateItem(1) })

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name || !data.description || !data.price) {
      return "Please provide a name, description, price for the item.";
    }

    if (!data.useCid && isEmpty(data.files)) {
      return "Must add at least one file";
    } else if (data.useCid && isEmpty(data.cid)) {
      return "Must provide a CID for the dataset";
    }

    return undefined
  };

  const errMessage = getActiveError(data);

  const create = async () => {
    setError(undefined);

    if (errMessage) {
      setError(errMessage)
      return;
    }

    if (!provider) {
      setError(`Please connect a valid ${ACTIVE_CHAIN.name} wallet`);
      return;
    }

    setLoading(true);
    const body = { ...data };
    if (!isEmpty(body.keywords)) {
      body['description'] = `${body.description}} | {${body.keywords}}}`
    }

    // Format files for upload.
    const files = (body.files || []).map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // TODO: add step 1/2 once tableland indexing ready.
      // 1) Create files/metadata to ipfs.
      let cid = data.cid
      if (!data.useCid) {
        if (!isEmpty(data.files)) {
          cid = await uploadFiles(
            files,
            res
          );
        } else {
          throw new Error("No files found");
        }
      }

      // 2) deploy contract with initial metadata
      let contract;
      const priceWei = ethers.utils.parseEther(res.price.toString()).toString();
      contract = await deployContract(provider.signer, cid, priceWei);
      // contract = {
      //   address: '0x1234'
      // }
      res["cid"] = cid;
      res["contract"] = contract.address;
      res["listingUrl"] = listingUrl(contract.address || cid);
      res["contractUrl"] = getExplorerUrl(contract.address);

      // 3) create table entry
      const listing = { ...data } // TODO: set all fields.
      listing['address'] = contract.address;

      try {
        // const price  = ethers.utils.parseEther(listing.price).toString()
        const listingResult = createListing(provider.signer, listing)
      } catch (e) {
        console.error('error creating db listing', e)
        // res['dbError'] = JSON.stringify(e.message || e.response?.message || e)
      }

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
    } catch (e) {
      console.error("error creating datax request", e);
      const message = e.reason || e.response?.message || e.message
      setError(humanError(message))
    } finally {
      setLoading(false)
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (!errMessage) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="centered standard-margin">
            <Image src="logo.png" alt="DataX Logo" width={180} height={37} />
            <h3>Create new data listing</h3>
            <br />
            <br />
          </div>
        </Col>
      </Row>

      <Row>

        <Col span={16}>

          <div className="create-form white boxed">
            {!result && <>
              <h3 className="vertical-margin">General Information:</h3>
              <a href="#" onClick={e => {
                e.preventDefault()
                setDemo()
              }}>Set demo values</a>
              <Divider />


              <h4>Name</h4>
              <Input
                placeholder="Name of listing"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
              <br />
              <br />
              <h4>Description</h4>
              <TextArea
                aria-label="Description"
                onChange={(e) => updateData("description", e.target.value)}
                placeholder="Add any additional description on the dataset"
                prefix="Description"
                value={data.description}
              />
              <br />
              <br />


              <h4>Price ({ACTIVE_CHAIN.symbol})</h4>
              <Input
                placeholder="Purchase price"
                value={data.price}
                onChange={(e) => updateData("price", e.target.value)}
              />
              <br />
              <br />



              <h4>[Optional] Listing image (link)</h4>
              <Input
                placeholder="Provide a link to an image describing your listing"
                value={data.image}
                onChange={(e) => updateData("image", e.target.value)}
              />
              <br />
              <br />


              <h4>[Optional] Keywords (enter separated by comma)</h4>
              <Input
                placeholder={"Add keywords to help others understand and find your listing"}
                value={data.keywords}
                onChange={(e) => updateData("keywords", e.target.value)}
              />
              <br />
              <br />
              <h4>Address</h4>
              <Input
                placeholder={'Your address'}
                value={wallet?.address || data.createdby}
                disabled
                onChange={(e) => updateData("createdBy", e.target.value)}
              />

              {/* Checkbox for useCid */}
              <br />
              <br />
              <h4>Is this a large dataset (over 5MB) or do you have a CID already?</h4>

              <Checkbox
                type="checkbox"
                checked={data.useCid}
                onChange={(e) => updateData("useCid", e.target.checked)}
              />

              <br />
              <br />


              {data.useCid && <>

                <Card title="Provide CID link to dataset">
                  <br />
                  <p>Use an existing dataset cid or a <a href="https://lotus.filecoin.io/tutorials/lotus/large-files/" target="_blank">Lotus</a> client to upload an encrypted or unencrypted (less secure) dataset.</p>
                  <br />
                  <h4>Dataset CID</h4>
                  <Input
                    placeholder="Dataset CID"
                    value={data.cid}
                    onChange={(e) => updateData("cid", e.target.value)}
                  />
                </Card>
              </>}

              {!data.useCid && <>
                <Card title="Upload dataset(s) for purchaseable collection">

                  {/* <h3 className="vertical-margin">Upload dataset(s) for purchaseable collection</h3> */}
                  <FileDrop
                    files={data.files || []}
                    setFiles={(files) => updateData("files", files)}
                  />

                </Card>
              </>}

              {/* TODO: add configurable amount of items */}

              <div>

                <Button
                  type="primary"
                  className="standard-button"
                  onClick={create}
                  disabled={loading || errMessage}
                  loading={loading}
                  size="large"
                >
                  Create Listing
                </Button>

                {!error && !result && loading && (
                <span className="italic">&nbsp;Deploying a listing contract. Confirmation may take a few moments.</span>
              )}
                <Divider/>

                <p className="bold">Note: Listings are considered unverified until confirmed by an admin of {APP_NAME} after posting.

                </p>
              </div>
      
              <br />
              <br />
            </>}
            {error && <div className="error-text">Error: {error}</div>}
            {result && (<div>
              <Result status="success"
                title="Listing created! Confirm last transaction to index the result" subTitle="Access your data page and content below. It may take a few minutes to confirm the listing on the network." />
              <div>
                <Button href={ipfsUrl(result.cid)} target="_blank">
                  Download files
                </Button>
                 {/* (download secure <a href="https://spec.filecoin.io/systems/filecoin_files/piece/#:~:text=In%20order%20to%20make%20a,un%2DCAR'ed%20constructions." target="_blank">.car</a> format) */}
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share or post this page with potential buyers:
                  <br />
                  <a href={result.listingUrl} target="_blank">
                    View listing page 
                  </a> (the listing may take a few minutes to become available on the network).
                </p>
              </div>
            </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              items={[{
                title: 'Fill in fields',
                description: 'Enter required data.'
              }, {
                title: `Create ${APP_NAME} listing`,
                description: 'Deploys a smart contract and creates a purchase page for the dataset'
              }, {
                title: 'Use the generated purchase page to sell your data',
              }]}
              current={getStep()}
            >
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateListing.propTypes = {};

export default CreateListing;