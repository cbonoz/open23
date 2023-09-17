'use client';

import { APP_NAME } from "../util/constant";
import Image from 'next/image'
import Button from 'antd/es/button'
import { setupTables } from "../util/tableland";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function About() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()

    const router = useRouter()
    return (
     <div className="about-page">
        <Image src="logo.png" alt="DataX Logo" width={180} height={37} priority />
        <br/>
        <br/>

        <p>
        DataX is a bid/ask marketplace for data similar to StockX where users can list data for sale and then people can set their asking price. Built using NextJS, Filecoin FVM, Tableland, Saturn, and web3.storage.
        </p>

        {/* github */}
        <p>
            {APP_NAME} is an open source project. You can find the code on GitHub here.
        </p>
        <a href="https://github.com/open23" target="_blank">GitHub</a>

        <br/>
        <br/>

        {/* Create listing */}
        <Button type="primary" onClick={() => {
            router.push('/create')
        }}>Create new listing</Button>&nbsp;

        <Button type="secondary" disabled={loading} loading={loading} onClick={async () => {
            setLoading(true)
            try {
                const res = await setupTables()
                setResult('Table name: ' + JSON.stringify(res));
            } catch (e) {
                console.error('error creating tables', e)
            } finally {
                setLoading(false)
            }
        }}>Create tables</Button>

        {result && <div>
            <br/>
            <h2>Created tables: </h2>
            <br/>
            Listing table: {result.listingTable}<br/>
            Offer table{result.offerTable}
            </div>}


     </div>
    )
}