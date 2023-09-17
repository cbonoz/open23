import { Card } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function ListingCard({ listing }) {

    const router = useRouter()
    return <Card
        className="listing-card"
        onClick={() => {
            router.push(`/listing/${listing.id}`)
        }}
        hoverable
        style={{ width: 360 }}
        actions={[
            <div key="purchases">Purchases: {listing.purchases}</div>,
            <div key="last sale">List Price: {listing.price}</div>,
        ]}
        cover={<Image alt={listing.name} width={240} height={240} src={listing.image} />}>
        <Card.Meta title={listing.name} description={listing.description} />
    </Card>

}