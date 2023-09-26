'use client'

import { Breadcrumb, Spin } from "antd"
import ListingDetail from "../../lib/ListingDetail"
import { EXAMPLE_ITEM, generateItem } from "../../constants"
import React, { useState, useEffect } from "react"
import { DATASET_MAP } from "../../constants"
import { getListing } from "../../util/tableland"
import { isEmpty } from "../../util"


export default function ListingPage({ params }) {
    const { listingId } = params

    return (
        <div>
            <ListingDetail listingId={listingId} />
        </div>
    )
}