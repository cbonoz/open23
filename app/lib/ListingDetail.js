'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
    Card,
    Button,
    Statistic,
    Row,
    Col,
    Spin,
    Divider,
    Modal,
    Input,
    Breadcrumb,
    Result,
} from 'antd';
import Image from 'next/image'
import { abbreviate, convertCamelToHuman, formatCurrency, formatListing, getExplorerUrl, humanError, ipfsUrl, isEmpty } from '../util';
import { ACTIVE_CHAIN, APP_NAME, EXAMPLE_OFFERS, STAT_KEYS } from '../constants';
import { LineChart, PieChart, BarChart } from 'react-chartkick'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { getMetadata, purchaseContract } from '../util/listingContract';
import { addPurchase, createOffer, getListing, getOffersForListing } from '../util/tableland';
import { useWallet } from './WalletProviderWrapper';
import { ethers } from 'ethers';

import 'chartkick/chart.js'


const ListingDetail = ({ listingId }) => {
    const [loading, setLoading] = useState(true)
    const [offerData, setOfferData] = useState(EXAMPLE_OFFERS)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [result, setResult] = useState()
    const [error, setError] = useState()
    const [listing, setListing] = useState()
    const [amount, setAmount] = useState()
    console.log('listing', listingId)

    const { connect, provider, wallet, logout } = useWallet()

    async function fetchListing(id) {
        setError()
        setLoading(true)
        try {
            const res = await getListing(id)
            if (isEmpty(res)) {
                throw new Error('Listing not found. Do you have a valid listing url?')
            }
            const firstResult = res[0]
            console.log('got listing', firstResult)
            setListing(firstResult)


        } catch (e) {
            console.error('error getting listing', e)
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchListing(listingId)

        // fetchListing(DATASET_MAP[listingId])
    }, [listingId])

    async function getMeta(signer) {
        try {
            const metadata = await getMetadata(signer, listingId)
            console.log('metadata', metadata)
            setResult({
                cid: metadata[0],
                totalPurchases: metadata[3],
            })
        } catch (e) {
            console.log('error getting metadata', e)
        }
    }

    useEffect(() => {
        if (provider) {
            getMeta(provider.signer)
        }
    }, [provider, listingId])

    useEffect(() => {

        async function fetchOffers(listingId) {
            // try / catch, no loading
            setLoading(true)
            try {
                const res = await getOffersForListing(listingId)
                console.log('offers', res)
                setOfferData(res)
            } catch (e) {
                console.error('error getting offers', e)
            } finally {
                setLoading(false)
            }
        }
        if (listingId) {
            fetchOffers(listingId)
        }
    }, [listingId]);


    const breadcrumbs = [
        {
            title: 'Listings',
            href: '/search'
        },
        {
            title: listing?.name,
            href: `/listing/${listingId}`
        }
    ]

    async function makePurchase() {
        setLoading(true)
        try {
            const res = await purchaseContract(provider.signer, listing.address, listing.price.toString())
            console.log('purchase', res)
            setResult(res)
            try {
                addPurchase(provider.signer, listing.address)
            } catch (e) {

            }
        } catch (e) {
            console.error('error purchasing', e)
            alert('Error purchasing: ' + humanError(e));
        } finally {
            setLoading(false)
        }
    }
    async function makeOffer() {
        setResult()
        if (!amount || amount <= 0) {
            alert('Please enter an offer more than ' + formatCurrency(0));
            return
        }

        if (amount >= parseFloat(formattedListing.price.split(' ')[0])) {
            alert('Please enter an offer less than the listing price: ' + formattedListing.price)
            return
        }
        setLoading(true)

        try {

            const offer = {
                amount: ethers.utils.parseEther(amount.toString()),
                listingId: listing.id,
                createdAt: Date.now(),
                createdBy: wallet.address,
                address: listing.address,
            }
            const res = await createOffer(provider.signer, offer)
            console.log('make offer', res)
            setResult()
        } catch (e) {
            console.error('error making offer', e)
        } finally {
            // greedy add.
            setOfferData([...offerData, [new Date().toLocaleDateString(), amount]])
            setLoading(false)
        }
    }

    if (loading) {
        return <Spin size='large' />
    }

    if (error || !listing) {
        return <Result
            status="warning"
            title="Error loading listing"
            subTitle={error || 'Please try another url or return to search'}
            extra={[
                <Button type="primary" key={'search'} onClick={() => window.location.href = '/'}>Return to search</Button>
            ]}
        />
    }

    const formattedListing = formatListing(listing);
    const hasCid = !isEmpty(result?.cid)

    return (
        <div className="listing-detail-page">
            <Breadcrumb items={breadcrumbs} />
            <br />
            <Card title={<span style={{ color: "green" }}>For Purchase</span>}>
                <h1>{listing.name}</h1>
                <h3>{listing.description}</h3>
                <Divider />
                <Row>

                    <Col span={16}>
                        <section className="product-images">
                            <Image width={450} height={300} src={listing.image} alt={listing.name} />
                            <br />
                            <br />
                        </section>
                        <section className="product-details">
                            <Card title="Details">
                                {Object.keys(formattedListing).map((key, i) => {
                                    if (key === 'image' || key === 'description' || key === 'name' || isEmpty(key)) {
                                        return
                                    }
                                    return (<span
                                        key={i}
                                    >
                                        <Statistic
                                            style={{ display: 'inline-block', marginRight: 32 }}
                                            title={convertCamelToHuman(key)}
                                            value={formattedListing[key]} />
                                    </span>
                                    )
                                })}
                                {!!listing.verified && <p className='success-text'>
                                    <h3>
                                        <CheckCircleOutlined />&nbsp;Listing marked verified by {APP_NAME}</h3>
                                </p>
                                }
                                {!listing.verified && <p className='error-text'>
                                    <CloseCircleOutlined />&nbsp;Listing not yet verified, purchase at your own risk.
                                </p>
                                }
                            </Card>
                        </section>
                    </Col>
                    <Col span={8}>

                        <Card title="Purchase">
                            <section className="product-actions">
                                <p>
                                    <b>Listing Price: {formattedListing.price} </b>
                                    <br />
                                </p>
                                <p>
                                    Purchase this dataset or make an offer.
                                </p>
                                <br />
                                <Button
                                    loading={loading}
                                    disabled={!wallet || loading || hasCid}
                                    onClick={makePurchase}
                                    type="primary">{wallet ? 'Buy Now' : 'Connect Wallet'}</Button>&nbsp;
                                {/* <Button type="default">Add to Cart</Button> */}
                                {wallet?.address && <Button
                                    disabled={loading || hasCid}
                                    onClick={async () => {
                                        // await checkWallet()
                                        setShowOfferModal(!showOfferModal)
                                    }} type="link">Make an Offer</Button>}


                                {hasCid && <div>
                                    <Divider />
                                    <p className='success-text'>You have purchased this dataset!</p>
                                    {/* Get cid */}
                                    <b>
                                        <a href={ipfsUrl(result.cid)} target="_blank">Download again</a>
                                    </b>

                                    <br />
                                    <a href="https://github.com/filecoin-project/lassie#extracting-content-from-a-car" target="_blank">How to extract</a>
                                </div>
                                }
                            </section>
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <h3>Offer trend</h3>
                        {/* https://chartkick.com/react */}

                        {/* Chart */}
                        <LineChart data={offerData} xtitle="Date" ytitle={`Amount (${ACTIVE_CHAIN.symbol}`}

                            download={true} />


                        <a href="#" onClick={() => {
                            setOfferData(EXAMPLE_OFFERS)
                        }}>Show example offers</a>


                    </Col>
                </Row>
            </Card>


            {/* TODO: enable offer */}
            <Modal
                title={listing?.name}
                open={showOfferModal}
                okText="Make offer"
                onOk={makeOffer}
                confirmLoading={loading}
                onCancel={() => setShowOfferModal(false)}
            >
                {/* <h3>{listing.name}</h3> */}
                <h3>Make an offer on this dataset</h3>
                <p>Listing price: {formattedListing.price}</p>
                <Divider />

                <Input
                    type="number"
                    placeholder={`Enter amount (${ACTIVE_CHAIN.symbol})`}
                    prefix={`Your offer (${ACTIVE_CHAIN.symbol}):`}
                    value={amount}
                    onError={(e) => console.log('error', e)}
                    onChange={(e) => setAmount(e.target.value)}
                />

            </Modal>

        </div>)
};

export default ListingDetail;