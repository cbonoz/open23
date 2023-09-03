'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useContext, useState } from 'react'
import WalletContext, { useWallet } from './context/wallet'
import Search from 'antd/es/input/Search'
import { getListings } from './util/tableland'

export default function Home() {

  const [listings, setListings] = useState([])

  // const listings = await getListings();
  // console.log('wallet', wallet, setWallet);

  return (
    <div>
      <h1>Main page</h1>

      <div className={styles.grid}>
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        {listings.map((listing, i) => {
          return <ListingCard listing={listing} key={i} />
        })}
      </div>

    </div>
  )
}
