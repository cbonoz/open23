'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useContext, useEffect, useState } from 'react'
import Search from 'antd/es/input/Search'
import Head from 'next/head'
import ListingCard from './lib/ListingCard'
import { EXAMPLE_ITEM, generateItem } from './util/constant'
import { Spin } from 'antd'
import { getListings } from './util/tableland'
import Script from 'next/script'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([generateItem(1), generateItem(2)])

  async function get() {
    setLoading(true)
    try {
      const res = await getListings(0, 100)
      console.log('get listings', res)
      if (res) {
        setListings(res)
      }
    } catch (e) {
      console.error('error getting listings', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    get()
  }, [])


  return (
    <div className='container'>
      <h1>Search listings</h1>
      <div className={styles.grid}>
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        {loading && <div>
          <Spin size='large' />
        </div>}
        <br />
        {!loading && <div className="listing-section">
          {listings.map((listing, i) => {
            return <ListingCard listing={listing} key={i} />
          })}
        </div>}
        <br/>
        {!loading && listings.length === 0 && <div>
          No listings found
        </div>}
      </div>

    </div>
  )
}
