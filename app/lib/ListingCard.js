import { Card } from "antd";



export default function ListingCard({listing}) {

    return <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={listing.image} />}
        actions={
            [
                <div onClick={
                    () => {
                        console.log('clicked')
                        // TODO go to detail page
                    }
                }>
                    <p>{listing.price}</p>
                    <p>{listing.location}</p>
                </div>
            ]
        }
    >
        <Card.Meta title={listing.title} description={listing.description} />
    </Card>

}