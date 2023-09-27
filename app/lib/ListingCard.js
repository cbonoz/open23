import { Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ACTIVE_CHAIN } from "../constants";



export default function ListingCard({ listing }) {
    const router = useRouter()

    const desc = <span>
        {listing.description.substring(0, 100)}...<br/>
        <div className="bold small-font">Uploaded: {listing.created_at}</div>
    </span>
    return <Card
        className="listing-card"
        onClick={() => {
            router.push(`/listing/${listing.address}`)
        }}
        hoverable
        actions={[
            <div key="purchases">Purchases: {listing.purchases}</div>,
            <div key="last sale">List Price: {listing.price}</div>,
        ]}
        cover={<Image alt={listing.name} width={260} height={200} src={listing.image} />}>
        <Card.Meta title={listing.name} description={desc}/>
    </Card>

}