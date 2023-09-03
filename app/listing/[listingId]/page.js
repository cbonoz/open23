

export default function ListingDetail({ params }) {
    const { listingId } = params
    return (
        <div>
            <h1>Listing detail page</h1>
            <p>{listingId}</p>
        </div>
    )
}