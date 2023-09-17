'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useContext, useState } from 'react'
import Search from 'antd/es/input/Search'
import Head from 'next/head'
import ListingCard from './lib/ListingCard'
import { EXAMPLE_ITEM } from './util/constant'

export default function Home() {

  const [listings, setListings] = useState([EXAMPLE_ITEM])

  // const listings = await getListings();
  // console.log('wallet', wallet, setWallet);

  return (
    <div>
      <h1>Search listings</h1>
      <Head>
        {/* <meta property="og:title" content="My new title" key="title" /> */}
        {/* favicon */}
        <title>My page title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.grid}>
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        <br />
        <div className="listing-section">
          {listings.map((listing, i) => {
            return <ListingCard listing={listing} key={i} />
          })}
        </div>
      </div>

    </div>
  )
}
