'use client';

import { APP_NAME, EXAMPLE_DATASETS } from "../constants";
import Image from 'next/image'
import Button from 'antd/es/button'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, Divider } from "antd";


export default function About() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()

    const router = useRouter()
    return (
        <div className="about-page">
            <br />
            <br />

            <p>
                <Image src="logo.png" alt="DataX Logo" width={180} height={37} /><br /><br />
                DataX is a bid/ask marketplace for data similar to StockX where users can list data for sale and then people can set their asking price. Built using NextJS, Filecoin FVM, Tableland, Saturn, and web3.storage.
            </p>

            {/* github */}
            <p>
                {APP_NAME} is an open source project. You can find the code on GitHub here:&nbsp;
                <a href="https://github.com/open23" target="_blank">GitHub</a>&nbsp;
            </p>

            <p>
                Files served from {APP_NAME} are verified and secured with Filecoin Saturn.
            </p>

            <p>Note this is a hackathon prototype and would require additional work to be mainnet ready. By uploading data you agree that this service is used as-is and that data may be compromised or shared outside the platform.</p>

            <p>
                Follow the guide here to unpack your purchased content.
                https://web3.storage/docs/how-tos/work-with-car-files/
            </p>


            <p>

                {/* Create listing */}
                <Button type="primary" onClick={() => {
                    router.push('/create')
                }}>Create new listing</Button>&nbsp;


            </p>

            <Divider />

            <Card title="Upload ideas">


                {EXAMPLE_DATASETS.map((item, i) => {
                    return <div key={i}>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <p>{item.example}</p>
                    </div>
                })}

            </Card>

        </div>
    )
}