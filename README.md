<br/>
<p align='center'>
    <img src='./public/logo.png' width=600 />
</p>
<br/>

DataX
---

DataX is a bid/ask marketplace for data similar to StockX where folks can list data for sale and then people can set their asking price. Built using NextJS, Filecoin FVM, Tableland, Saturn, and web3.storage.

## Inspiration

The inspiration for DataX came from the need for a reliable and efficient marketplace where data can be traded just like other commodities. We wanted to create a platform that empowers data owners to monetize their data assets while allowing data consumers to access valuable information in a transparent and decentralized manner.



## What it does

DataX provides a user-friendly interface for listing various types of data sets. Data owners can upload their data, set a minimum asking price, and choose whether to list their data as an auction or for direct purchase. On the other side, data consumers can search for specific data sets, place bids in auctions, or directly purchase data at the listed prices.


### Core functions
* Create listing
* Quick listing filter
* Buy listing
* Make offer
* See offers


## How we built it

NextJS: We utilized NextJS to create a responsive and interactive frontend interface that offers a seamless browsing experience for users. Deployed on surge.

Filecoin FVM: The Filecoin File Verification Marketplace (FVM) integration ensures the security and immutability of listed data. This technology guarantees that data remains tamper-proof and accessible only to authorized users.

Tableland: Tableland is employed to manage the complex data relationships within the marketplace, enabling efficient search and discovery of relevant data sets.

web3.storage: To address the challenge of decentralized storage, we integrated web3.storage, which utilizes blockchain technology to securely store and retrieve data files.

                Filecoin Saturn: Saturn-secured .car files with verification have several advantages over trusting the server:

                <li>Decentralization: Filecoin is a decentralized storage network, meaning that files are stored on multiple nodes around the world. This makes it more resistant to censorship and hacking.</li>
                <li>Transparency: Filecoin Saturn car files are verified using a cryptographic proof-of-retrieval mechanism. This means that you can be sure that your files are stored and retrievable, even if the server is unavailable or untrustworthy.</li>
                <li>Efficiency: Filecoin Saturn car files are compressed and deduplicated, which means that they take up less storage space and can be transferred more quickly.</li>
                <li>Cost-effectiveness: Filecoin Saturn car files are stored on a peer-to-peer network, which means that you don't have to pay for expensive cloud storage.</li>
</ol>

DataverseOS: Authentication and user state management.

Saturn: Data validation (using browser client). https://github.com/filecoin-saturn/browser-client



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
