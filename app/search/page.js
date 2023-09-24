  'use client'

import { useContext, useEffect, useState } from 'react'
import Search from 'antd/es/input/Search'
import ListingCard from '../lib/ListingCard'
import { EXAMPLE_ITEM, generateItem } from '../constants'
import { Pagination, Spin } from 'antd'
import { getListings } from '../util/tableland'
import { isEmpty } from '../util'


import Fuse from "fuse.js";
import { DATASET_ITEMS, EXAMPLE_DATASETS } from '../constants'


export default function Home() {
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!searchValue) {
      setData(DATASET_ITEMS)
      return
    }
    const fuse = new Fuse(ITEMS, {
      keys: ['name', 'description']
    })
    const res = fuse.search(searchValue)
    setData(res.map(r => r.item))
  }, [searchValue])

  async function get() {
    setLoading(true)
    try {
      const res = await getListings(0, 100)
      console.log('get listings', res)
      if (isEmpty(res)) {
        setData(ITEMS)
      }
      // setListings(res)
    } catch (e) {
      console.error('error getting listings', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    get()
  }, [page, pageSize])


  return (
    <div className='container'>
      <div className='centered'>
        <h1>Search listings</h1>
        <br />
        <Search
          className='search-input'
          style={{ width: 600 }}
          placeholder="Search by listing name or description"
          onSearch={value => setSearchValue(value)} enterButton />
      </div>
      {loading && <div>
        <Spin size='large' />
      </div>}
      {!loading && <div className="listing-section">
        {data.map((listing, i) => {
          return <ListingCard listing={listing} key={i} />
        })}
      </div>}
      <div className='centered'>
        {!loading && data.length === 0 && <div>
          No listings found
        </div>}
        {data.length > 0 && <div><p className='bold'>Found listings: {data.length}</p></div>}
        <br />
        <Pagination
          current={page}
          total={data.length}
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
        />
        <br />
      </div>


    </div>
  )
}
