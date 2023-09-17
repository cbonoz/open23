'use client'; // Remove for SSR.

import { WalletProvider, useWallet } from './context/wallet'
import { Button, Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import StyledComponentsRegistry from './lib/AntdRegistry';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import { APP_NAME } from './util/constant';
import { Footer } from 'antd/es/layout/layout';
import { abbreviate } from './util';

const { Header, Content } = Layout;
const inter = Inter({ subsets: ['latin'] })

function UiLayout({ children }) {

  const pathname = usePathname()
  const { connect, wallet, logout } = useWallet()

  const menuItems = [
    {
      key: '/',
      label: <Link href="/">Search listings</Link>,
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
  ]

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Script async src="https://saturn.tech/widget.js" />
        <StyledComponentsRegistry>
          <Head>
            <title>
              {APP_NAME}
            </title>
            <meta
              name="description"
              content="DataX is a bid/ask marketplace for data."
              key="desc"
            />
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="favicon.ico" sizes="any" />

          </Head>
          <Layout>
            <Header style={{ background: '#fff', display: 'flex' }}>
              <Image src="/logo.png" alt="DataX Logo"
                className='header-logo'
                height={48}
                width={160}
                priority />

              <Menu style={{ minWidth: '800px' }}
                mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />

              <span style={{float: 'right', right: 20, position: 'absolute'}}>
                {!wallet?.address && <Button href="#" type="primary" onClick={connect}>Connect</Button>}
                {wallet?.address && <span>{abbreviate(wallet?.address)}&nbsp;(<a href="#" onClick={logout}>logout</a>)</span>}
              </span>


            </Header>
            <Content className='container'>
              {/* Pass children to the content area */}
              <div className='container'>
                {children}
              </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
              <hr />
              <br />
              {APP_NAME} ©2023. Created for the&nbsp;
              <a href="https://www.encode.club/open-data-hack" target='_blank'>Encode Open Data Hack</a>.

            </Footer>
          </Layout>

        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default function RootLayout({ children }) {

  return (
    <WalletProvider>
      <UiLayout>
        {children}
      </UiLayout>
    </WalletProvider>
  )

}