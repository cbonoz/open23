import React, { Suspense } from 'react';
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
import { convertCamelToHuman } from '../util';

const STAT_KEYS = [
    'purchases',
    'price',
    'size',
    'createdBy',
    'tags',
    'createdAt'
]

const ListingDetail = ({ item }) => {
    return (
        <div className="listing-detail-page">
            <Card>
                <Divider />
                <Row>
                        <h1>{item.name}</h1>
                        <h3>{item.description}</h3>
                        <br/>
                        <br/>
                    <Col span={12}>
                        <section className="product-images">
                            <Image width={300} height={100} src={item.image} alt={item.name} />
                        </section>
                        <section className="product-details">
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
                            <Button type="primary">Buy Now</Button>
                            <Button type="default">Add to Cart</Button>
                            <Button type="link">Make an Offer</Button>
                        </section>
                        </Card>

                
                 
                    </Col>
                </Row>
            </Card>


        </div>
    );
};

export default ListingDetail;