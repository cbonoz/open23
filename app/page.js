'use client'

import React, { useState, } from 'react'
import { Button, Spin, Row, Col } from 'antd';
import { APP_DESC, APP_NAME } from './constants';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Image from 'next/image';

// TODO: change
const CHECKLIST_ITEMS = [
  "An open data bid/ask marketplace",
  "No middle man fees. Instant delivery of data",
  "No user accounts or vendor agreements required"
];


const Home = () => {
  const [loading, setLoading] = useState(false)
  // next router
  const [error, setError] = useState()

  return <div className='home-section'>
    <Row className='home-section'>
      <Col span={12}>
        <div className='prompt-section'>
          {/* <img src={logo} className='home-logo'/><br/> */}
          {/* {APP_DESC} */}
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
          <Button className='standard-btn' size="large" type="primary" onClick={() => console.log('/create')}>
            Create a data listing
          </Button>
        </div>
      </Col>
      <Col span={12}>
        {/* <Image width={400} height={400} className='hero-image' src={'https://cdn.dribbble.com/users/869467/screenshots/2662113/media/1c9271b1817ba7a3052ebd3dd20de096.gif'} /> */}
      </Col>
    </Row>

  </div>

}

export default Home