'use client'; // Remove for SSR.

import { WalletProvider } from './context/wallet'
import { Layout } from 'antd';
import { Inter } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const { Header, Content } = Layout;
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <WalletProvider>
          <Layout>
      <Header style={{ background: '#fff', padding: 10 }}>
        {/* Add your header content here */}
        {/* <h1>DataX</h1> */}
        <Image src="/logo.png" alt="DataX Logo" width={180} height={37} priority />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {/* Pass children to the content area */}
        {children}
      </Content>
    </Layout>
    </WalletProvider>
  )
}
