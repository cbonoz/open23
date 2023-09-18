'use client'

import { Breadcrumb } from "antd"
import ListingDetail from "../../lib/ListingDetail"
import { EXAMPLE_ITEM, generateItem } from "../../util/constant"
import React, { useState, useEffect } from "react"


export default function ListingPage({ params }) {
    const [listing, setListing] = useState(null)
    const { listingId } = params


    async function fetchListing(id) {
        setListing(generateItem(id))
    }

    useEffect(() => {
        fetchListing(listingId)
    }, [listingId])

    const breadcrumbs = [
        {
            title: 'Listings',
            href: '/'
        },
        {
            title: listing?.name,
            href: `/listing/${listingId}`
        }
    ]

    return (
        <div>
            {listing && <Breadcrumb items={breadcrumbs}/>}
            <br/>
            <ListingDetail item={listing} />

        </div>
    )
}