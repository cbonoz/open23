'use client';

import { Button, Divider, Input } from "antd";
import { useState } from "react";
import { APP_NAME } from "../constants";

export default function Admin() {

    const [loading, setLoading] = useState(false)
    const [tableResult, setTableResult] = useState()
    const [verifyResult, setVerifyResult] = useState()
    const [error, setError] = useState()
    const [listingId, setListingId] = useState()

    async function validateListing() {
        if (!listingId) {
            return
        }
        setLoading(true)
        try {
            const res = await validateListing(listingId)
            setVerifyResult(res)
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }

    return <div>
        <h1>Admin</h1>

        <p>The function contains admin actions for the {APP_NAME} application.</p>

        {error && <div className="error-text">
            {error}
        </div>}

        <Divider />

        <h3>Create app tables</h3>

        <p>This command creates the production tables used for storing listings and offers in the {APP_NAME} application.
        </p>

        <Button className="standard-btn" type="primary" disabled={loading} loading={loading} onClick={async () => {
            setLoading(true)
            try {
                const res = await setupTables()
                setTableResult(res)
            } catch (e) {
                console.error('error creating tables', e)
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }}>Create tables (admin)</Button>


        {tableResult && <div>
            <br />
            <h2>Created tables: </h2>
            <br />
            Listing table: {tableResult.listingTable}<br />
            Offer table: {tableResult.offerTable}
        </div>}

        <Divider />

        <h3>Verify listing</h3>

        <Input
            placeholder="Listing ID"
            onChange={(e) => {
                setListingId(e.target.value)
            }}
            value={listingId} />

            <br/>

        <Button type="primary" disabled={loading} loading={loading} onClick={validateListing} className="standard-btn">Validate listing</Button>

        {verifyResult && <div className="success-text">
            Listing verified
            {JSON.stringify(verifyResult)}

        </div>
        }





    </div>



}