'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
    Card,
    Button,
    Statistic,
    Descriptions,
    Row,
    Col,
    List,
    Spin,
    Divider,
    Modal,
} from 'antd';
import Image from 'next/image'
import { abbreviate, convertCamelToHuman, getExplorerUrl } from '../util';
import { EXAMPLE_OFFERS, STAT_KEYS } from '../util/constant';
import { LineChart, PieChart } from 'react-chartkick'

import 'chartkick/chart.js'
import { purchaseContract } from '../util/listingContract';



const ListingDetail = ({ item }) => {
    const [loading, setLoading] = useState(false)
    const [offerData, setOfferData] = useState(EXAMPLE_OFFERS)
    const [offerVisible, setOfferVisible] = useState(false)

    if (!item) {
        return <Spin size='large' />
    }

    const createdAddress = item.createdBy.toString()
    console.log('createdAddress', createdAddress)

    async function makePurchase() {
        setLoading(true)
        try {
            const res = await purchaseContract(item.id)
            console.log('purchase', res)
        } catch (e) {
            console.error('error purchasing', e)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="listing-detail-page">
            <Card title={<span style={{color: "green"}}>For Purchase</span>}>
                <h1>{item.name}</h1>
                <h3>{item.description}</h3>
                <Divider />
                <Row>

                    <Col span={12}>
                        <section className="product-images">
                            <Image width={450} height={150} src={item.image} alt={item.name} />
                            <br/>
                            <br/>
                        </section>
                        <section className="product-details">
                            <Statistic
                                style={{ display: 'inline-block', marginRight: 32 }}
                                title={"Created by"}
                                value={
                                    <a href={getExplorerUrl(createdAddress)} target="_blank">
                                        {abbreviate(createdAddress)}
                                    </a>
                                }
                            />

                            {STAT_KEYS.map((key, i) => {
                                return (<span
                                    key={i}
                                >
                                    <Statistic
                                        style={{ display: 'inline-block', marginRight: 32 }}
                                        title={convertCamelToHuman(key)}
                                        value={item[key]} />
                                </span>
                                )
                            })}
                        </section>
                    </Col>
                    <Col span={12}>

                        <Card title="Purchase">
                            <section className="product-actions">
                                <p>
                                    <b>Price: {item.price} {item.currency}</b>
                                </p>
                                <p>
                                    Purchase this dataset or make an offer.
                                </p>
                                <br/>
                                <Button 
                                loading={loading}
                                disabled={loading}
                                onClick={makePurchase}
                                type="primary">Buy Now</Button>&nbsp;
                                {/* <Button type="default">Add to Cart</Button> */}
                                <Button
                                disabled={loading}
                                 onClick={() => setOfferVisible(!offerVisible)} type="link">Make an Offer</Button>
                            </section>
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <h3>Recent Offers</h3>
                        {/* https://chartkick.com/react */}

                        {/* Chart */}
                        <LineChart data={offerData} />


                    </Col>
                </Row>
            </Card>


            {/* TODO: enable offer */}
            <Modal
                title="Make an Offer"
                show={offerVisible}
                onOk={() => setOfferVisible(false)}
                onCancel={() => setOfferVisible(false)}
            >
                <p>Content</p>
            </Modal>


        </div>
    );
};

export default ListingDetail;