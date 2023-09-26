'use client'

import React, { useState, } from 'react'
import { Button, Spin, Row, Col } from 'antd';
import { APP_DESC, APP_NAME } from './constants';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// TODO: change
const CHECKLIST_ITEMS = [
  "An open data bid/ask marketplace backed by FEVM, Tableland, and Dataverse.",
  "No middle man fees. Instant delivery of data.",
  "No user accounts or vendor agreements required."
];

const HERO_IMAGE = 'https://assets-v2.lottiefiles.com/a/b2e71c48-1173-11ee-af24-e38df89b1a8a/esieSHm0ao.gif'


const Home = () => {
  const [loading, setLoading] = useState(false)
  // next router
  const router = useRouter()
  const [error, setError] = useState()

  return <div className='home-section'>
    <Row className='home-section'>
      <Col span={12}>
        <div className='prompt-section'>
          {/* <img src={logo} className='home-logo'/><br/> */}
          {APP_DESC}
        </div>
        {CHECKLIST_ITEMS.map((item, i) => {
          return (
            <p key={i}>
              <CheckCircleTwoTone twoToneColor="#00aa00" />
              &nbsp;
              {item}
            </p>
          );
        })}
        <div>
        </div>
        <div>
          <Button className='standard-btn' size="large" type="primary" onClick={() => router.push('/create')}>
            Create a data listing
          </Button>&nbsp;
          <Button className='standard-btn' size="large" type="dashed" onClick={() => router.push('/search')}>
            Search listings
          </Button>
        </div>
      </Col>
      <Col span={12}>
        <Image width={400} height={400} className='hero-image' src={HERO_IMAGE} alt={APP_NAME}/>
      </Col>
    </Row>

  </div>

}

export default Home