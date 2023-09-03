'use client'; // Remove for SSR.

import { WalletProvider, useWallet } from './context/wallet'
import { Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import StyledComponentsRegistry from './lib/AntdRegistry';
import Head from 'next/head';
import Link from 'next/link';

import './globals.css'

const { Header, Content } = Layout;
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  const pathname = usePathname()
  const wallet = useWallet()
  console.log('wallet', wallet)


  const menuItems = [

    {
      key: '/',
      label: <Link href="/">
        <Image src="logo.png" alt="DataX Logo" width={180} height={37} priority />
      </Link>,
      href: '/',
    },
    {
      key: '/create',
      label: <Link href="/create">Create</Link>,
      href: '/create',
    },
    {
      key: '/about',
      label: <Link href="/about">About</Link>,
      href: '/about',
    },
    {
      key: '/connect',
      style: { float: 'right' },
      label: <Link href="#" onClick={() => connect(window?.ethereum)}>Connect</Link>,
      href: '/connect',
    }
  ]

  return (
      <StyledComponentsRegistry>
        <Head>
          <title>
            DataX
          </title>
          <meta
            name="description"
            content="DataX is a bid/ask marketplace for data."
            key="desc"
          />
        </Head>
        <WalletProvider>
          <Layout>
            <Header style={{ background: '#fff', padding: 10 }}>
              <Menu mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />


            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              {/* Pass children to the content area */}
              {children}
            </Content>
          </Layout>
        </WalletProvider>
      </StyledComponentsRegistry>
  )
}
