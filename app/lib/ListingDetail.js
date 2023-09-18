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
} from 'antd';
import Image from 'next/image'
import { abbreviate, convertCamelToHuman, getExplorerUrl } from '../util';
import { STAT_KEYS } from '../util/constant';



const ListingDetail = ({ item }) => {
    const [loading, setLoading] = useState(false)
    const createdAddress = item.createdBy
    return (
        <div className="listing-detail-page">
            <Card>
                <h1>{item.name}</h1>
                <h3>{item.description}</h3>
                <Divider />
                <Row>

                    <Col span={12}>
                        <section className="product-images">
                            <Image width={300} height={100} src={item.image} alt={item.name} />
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
                                <Button type="primary">Buy Now</Button>&nbsp;
                                {/* <Button type="default">Add to Cart</Button> */}
                                <Button type="link">Make an Offer</Button>
                            </section>
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <h3>Recent Offers</h3>

                        {/* Chart */}

                    </Col>
                </Row>
            </Card>


        </div>
    );
};

export default ListingDetail;