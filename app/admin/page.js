'use client';

import { Button, Divider, Input } from "antd";
import { useState } from "react";
import { APP_NAME, OFFER_TABLE, LISTING_TABLE } from "../constants";
import { grantAccess, setupTables, verifyListing } from "../util/tableland";
import { useWallet } from "../lib/WalletProviderWrapper";

export default function Admin() {

    const [loading, setLoading] = useState(false)
    const [tableResult, setTableResult] = useState()
    const [verifyResult, setVerifyResult] = useState()
    const [error, setError] = useState()
    const [listingId, setListingId] = useState()
    const { provider } = useWallet()

    async function validateListing() {
        if (!listingId) {
            return
        }
        setError()
        setLoading(true)
        try {
            const res = await verifyListing(provider.signer, listingId)
            setVerifyResult(res)
        } catch (e) {
            console.error('verifying listing', e)
            // setError(e.message)
        }
        setLoading(false)
    }

    const hasTables = OFFER_TABLE && LISTING_TABLE;

    return <div>
        <h1>Admin</h1>

        <p>The function contains admin actions for the {APP_NAME} application. </p>

        {error && <div className="error-text">
            {error}
        </div>}

        <Divider />

        <h3>Manage {APP_NAME} app tables</h3>

        <p>This command creates the production tables used for storing listings and offers in the {APP_NAME} application. Note this may require several confirmations, see setupTables for details. Steps:<br/><br/>
        1) If no tables in `.env`, create listing and offer tables on Tableland then apply public access grants to each.<br/>
        2) If tables in `.env`, apply grants to existing tables.
        </p>

        <Button className="standard-btn" type="primary" disabled={loading} loading={loading} onClick={async () => {
            setLoading(true)
            setError()
            try {
                const res = await setupTables(provider.signer)
                setTableResult(res)
            } catch (e) {
                console.error('error creating tables', e)
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }}>{!hasTables? 'Create' : 'Add grants to'} app tables</Button>


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

        <br />

        <Button type="primary" disabled={loading} loading={loading} onClick={validateListing} className="standard-btn">Validate listing</Button>

        {verifyResult && <div className="success-text">
            Listing verified
            {JSON.stringify(verifyResult)}
        </div>}

        <Divider />

    </div>



}