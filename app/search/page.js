  'use client'

import { useContext, useEffect, useState } from 'react'
import Search from 'antd/es/input/Search'
import ListingCard from '../lib/ListingCard'
import { EXAMPLE_ITEM, generateItem } from '../constants'
import { Divider, Pagination, Spin } from 'antd'
import { getListings } from '../util/tableland'
import { formatListing, isEmpty } from '../util'

import Fuse from "fuse.js";


export default function Home() {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (isEmpty(searchValue)) {
      setFilteredData([])
      return
    }
    const fuse = new Fuse(data, {
      keys: ['name', 'description']
    })
    const res = fuse.search(searchValue)
    setFilteredData(res.map(r => r.item))
  }, [searchValue, data])

  async function get() {
    setLoading(true)
    try {
      const res = await getListings(0, 100)
      const formatted = res.map(formatListing)
      console.log('get listings', formatted)
      // if (isEmpty(res)) {
      //   setData(ITEMS)
      // } else {
      setData(formatted)
      // }
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

  const filteredItems = searchValue ? filteredData : data;

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
      <Divider/>
      <div className='centered'>
        {!loading && isEmpty(data) && <div>
          No listings found
        </div>}
        {data.length > 0 && <div>
          <p className='bold'>Found listings: {data.length}</p></div>}
        <br />
        <Pagination
          current={page}
          total={filteredItems.length}
          pageSize={pageSize}
          onChange={(page) => setPage(page)}
        />
        <br />
      </div>


    </div>
  )
}
