import React, { Suspense } from 'react';


export default async function ListingDetail({ params }) {

    const fullListing = await getListingWithOffers(listingId)

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            {listing && <div>

                <h1>{listing.title}</h1>
                <p>{listing.description}</p>
                <p>{listing.price}</p>


                
                
            </div>}

        </Suspense>

    </>


}