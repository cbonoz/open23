import ListingDetail from "../../lib/ListingDetail"
import { EXAMPLE_ITEM } from "../../util/constant"


export default function ListingPage({ params }) {
    const { listingId } = params

    return (
        <div>
            <ListingDetail item={EXAMPLE_ITEM} />

        </div>
    )
}