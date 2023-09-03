import { Button } from 'antd'
import React, { useState } from 'react'

export default function CreateListing() {

    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(null)


    const updateData = async (key, value) => {
        setData({ ...data, [key]: value })
    }

    const submitData = async () => {

        setLoading(true)

        try {
            // 1. Create web3 storage entry (returning cid)

            // 2. Deploy contract on chain (returning listing id)

            // 3. Index listing id and cid in tableland.

        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }


    const incompleteData = !data.title || !data.description || !data.price || !data.image;

    return (
        <div>
            <h1>Create page</h1>

            <Button type="primary" disabled={loading || incompleteData} loading={loading} onClick={submitData}>
                Submit
            </Button>

        </div>
    )
}