'use client'

import React, { useEffect, useState } from "react";
import { Button, Input, Row, Col, Steps, Result, Divider } from "antd";
import { listingUrl, ipfsUrl, getExplorerUrl, humanError, } from "../util";
import { uploadFiles } from "../util/stor";
import TextArea from "antd/lib/input/TextArea";
import { EXAMPLE_ITEM, ACTIVE_CHAIN, APP_NAME } from "../util/constant";
import { FileDrop } from "./FileDrop";
import { useWallet } from "../context/wallet";
import { createListing } from "../util/tableland";
import { deployContract } from "../util/listingContract";

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

  const setDemo = () => setData({ ...EXAMPLE_ITEM })

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const getActiveError = (data) => {
    if (!data.name || !data.description || !data.price) {
      return "Please provide a name, description, price for the item.";
    }

    if (!data.files || (data.files || []).length === 0) {
      return "Must add at least one file";
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

    // Format files for upload.
    const files = (body.files || []).map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) Create files/metadata to ipfs.
      let cid = '';
      if (files && files.length > 0) {
        cid = await uploadFiles(
          files,
          res
        );
      } else {
        throw new Error("No files found");
      }

      // 2) deploy contract with initial metadata
      const contract = await deployContract(provider.signer, cid, res.price)
      res["cid"] = cid;
      res["listingUrl"] = listingUrl(cid);
      res["contract"] = contract.address;
      res["contractUrl"] = getExplorerUrl(contract.address);

      // 3) create table entry
      const listing = { ...data } // TODO: set all fields.
      listing['address'] = contract.address;
      try {
        const listingResult = await createListing(listing);
      } catch (e) {
        console.error('error creating db listing', e)
        res['dbError'] = JSON.stringify(e.message || e.response?.message || e)
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
        <Col span={16}>
          <div className="create-form white boxed">
            {!result && <><h2>Create new datax listing</h2>
              <Divider />
              <a href="#" onClick={e => {
                e.preventDefault()
                setDemo()
              }}>Set demo values</a>
              <br />
              <br />

              <h3 className="vertical-margin">Data Listing information:</h3>
              <h5>Name</h5>
              <Input
                placeholder="Name of listing"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
              />
              <br />
              <br />
              <h5>Description</h5>
              <TextArea
                aria-label="Description"
                onChange={(e) => updateData("description", e.target.value)}
                placeholder="Add any additional description on the dataset"
                prefix="Description"
                value={data.description}
              />
              <br />
              <br />

     
              <h5>Price ({ACTIVE_CHAIN.symbol})</h5>
              <Input
                placeholder="Purchase price"
                value={data.price}
                onChange={(e) => updateData("price", e.target.value)}
              />
              <br />
              <br />

              <h5>[Optional] Listing image (link)</h5>
              <Input
                placeholder="Provide a link to an image describing your listing"
                value={data.image}
                onChange={(e) => updateData("image", e.target.value)}
              />
              <br />
              <br />


              <h5>[Optional] Keywords (enter separated by comma)</h5>
              <Input
                placeholder={"Add keywords to help others understand and find your listing"}
                value={data.tags}
                onChange={(e) => updateData("keywords", e.target.value)}
              />
              <br />
              <br />
              <h5>Address</h5>
              <Input
                placeholder={'Your address'}
                value={wallet?.address || data.createdby}
                disabled
                onChange={(e) => updateData("createdBy", e.target.value)}
              />

              {/* TODO: add configurable amount of items */}
              <h3 className="vertical-margin">Upload dataset(s) for purchaseable collection</h3>
              <FileDrop
                files={data.files || []}
                setFiles={(files) => updateData("files", files)}
              />

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
                <span>&nbsp;Note this may take a few moments.</span>
              )}
              <br />
              <br />
            </>}
            {error && <div className="error-text">Error: {error}</div>}
            {result && (<div>
              <Result status="success"
                title="Created datax request!" subTitle="Access your page and content below" />
              <div>
                <a href={ipfsUrl(result.cid)} target="_blank">
                  View files
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share or post this page with potential customers
                  <br />
                  <a href={result.listingUrl} target="_blank">
                    View listing page
                  </a>
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
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title={`Create ${APP_NAME} listing`}
                description="Deploys a smart contract and creates a purchase page for the dataset"
              />
              <Step
                title="Use the generated purchase page to sell your data"
                description="Others can purchase the dataset from this url"
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateListing.propTypes = {};

export default CreateListing;