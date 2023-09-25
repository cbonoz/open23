<br/>
<p align='center'>
    <img src='./public/logo.png' width=600 />
</p>
<br/>

DataX
---

DataX is a bid/ask marketplace for data similar to StockX where users can list data their unique and curated datasets for sale with the ability for public search and potential buyers to set their asking price. 

Built using NextJS, Filecoin FVM, Tableland, Dataverse, Saturn, and web3.storage.

Under 5MB can upload directly
Over 5MB can provide a link to the cid
DataX will provide instructions for both uploading and accessing files either through the app or a lotus client.

Uploaded Datasets all have a validation flag on them. By default all datasets are marked unvalidated until reviewed by an admin of the app (admins specified on the environment when the app is deployed). Unvalidated datasets can be purchased at buyers discretion.

## Inspiration


DataX creates a community around the curation and sharing and of both publically and privately created datasets.

The inspiration for DataX came from the need for a reliable and efficient marketplace where data can be traded just like other commodities. 

Existing data marketplaces have shown significant shortcomings that hinder their effectiveness and impede the seamless exchange of data:

1. Lack of Transparency: Many data marketplaces operate opaquely, making it difficult for data consumers to assess the quality and provenance of the data they seek. DataX, on the other hand, is built on a foundation of transparency, ensuring that users have access to comprehensive information about each dataset's source, history, and reliability.

2. Centralization and Monopoly: Traditional data marketplaces are often centralized, controlled by a single entity, which can lead to monopolistic practices, inflated prices, and limited choices. DataX adopts a decentralized approach, empowering data owners to set their own prices and enabling a competitive, diverse ecosystem.

3. Inflexible Pricing Models: Existing platforms may offer limited flexibility in pricing, making it challenging for data sellers to maximize the value of their assets. DataX allows data providers to name their price and even adjust it based on previous offers, facilitating fair negotiations and dynamic pricing strategies.

4. Inefficient Data Discovery: Finding the right dataset can be like searching for a needle in a haystack on some platforms, as they lack effective search and recommendation systems. DataX employs advanced algorithms to streamline data discovery, ensuring that data consumers can easily find the information they need. Each dataset on DataX gets it's own public purchase url that can be shared on the web.

5. Data Ownership and Security Concerns: Many data marketplaces do not adequately address data ownership and security concerns. DataX prioritizes data ownership rights and employs cutting-edge security measures to protect data throughout its lifecycle.

 We wanted to create a platform that empowers data owners to monetize their data assets while allowing data consumers to access valuable information in a transparent and decentralized manner. Sellers of the data can name their price to reveal a dataset and potential purchaser can either immediately buy it or make an offer. The seller can later change their price to match previous offers.


## What it does

DataX provides a user-friendly interface for listing various types of data sets. Data owners can upload their data, set a minimum asking price, and choose whether to list their data as an auction or for direct purchase. On the other side, data consumers can search for specific data sets, place bids in auctions, or directly purchase data at the listed prices.

Each uploaded data set gets its own FVM smart contract and unique url identified by the contract address. When a listing visitor purchases a dataset, a transaction is made against the listing contract, a transaction and transfer via the contract is recorded, and lastly Saturn securely delivers the car file representation of the data to the buyer via the cid.



### Core functions
* Create listing
* Search listings with quick listing filter
* Buy listing
* Make offer
* See offers
* View data set access history.


## Technologies used


Filecoin FVM: The Filecoin File Verification Marketplace (FVM) integration ensures the security and immutability of listed data. This technology guarantees that data remains tamper-proof and accessible only to authorized users.

Tableland: Tableland is employed to manage the complex data relationships within the marketplace, enabling efficient search and discovery of relevant data sets.

web3.storage: To address the challenge of decentralized storage, we integrated web3.storage, which utilizes blockchain technology to securely store and retrieve data files.

Filecoin Saturn: Saturn secures each data set client side with .car files delivered to the purchaser that guarantee additional tamper and hack-proofing from the original upload time (i.e. the original dataset is verified to be the one delivered on purchase). Validation is done using a hosted browser client service worker.

DataverseOS: Authentication and user state management plugging into existing wallets and providers the customer may already use (i.e. metamask).

NextJS: We utilized NextJS to create a responsive and interactive frontend interface that offers a seamless browsing experience for users. Deployed on surge.


<!-- Saturn: Data validation (using browser client). https://github.com/filecoin-saturn/browser-client -->


## Running the project

1. Copy `.env.sample` -> `.env`

2. Define the needed env variables.

3. `yarn; yarn dev`

The app should now be running on port 3000.

### Deployment build

1. `yarn out`

<!-- ## Challenges we ran into

## Accomplishments that we're proud of

## What we learned -->

## Potential future work
* Implement advanced data analytics tools to provide insights and trends on data usage, helping both sellers and buyers make informed decisions.
* Introduce real-time bidding functionality, allowing buyers to dynamically bid on data listings and enabling sellers to maximize their earnings.
* Enhance data verification processes by exploring additional blockchain technologies to ensure the integrity and authenticity of listed data.
* Collaborate with industry partners to onboard a wider range of data providers, enriching the variety and value of data available on the platform.
* Develop mobile applications for DataX to extend its accessibility, enabling users to engage in data transactions on-the-go.


### Useful links
* https://www.encode.club/open-data-hack
* https://ownershiplabs.notion.site/DataverseOS-Builders-Hackathon-2-0-377b2b3337454311ace6eb82a6ef5472
* https://docs.tableland.xyz/sdk/database/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
