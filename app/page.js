'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useContext } from 'react'
import WalletContext, { useWallet } from './context/wallet'

export default function Home() {

  const {wallet, setWallet} = useWallet()

  console.log('wallet', wallet, setWallet);

  return (
   <div>

    <h1>Main page</h1>
   </div>
  )
}
