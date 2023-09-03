'use client'; // Remove for SSR.

import { WalletProvider, useWallet } from './context/wallet'
import { Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import StyledComponentsRegistry from './lib/AntdRegistry';
import Head from 'next/head';
import Link from 'next/link';
import './globals.css';

const { Header, Content } = Layout;
const inter = Inter({ subsets: ['latin'] })




function UiLayout({ children }) {

  const pathname = usePathname()
  const {connect} = useWallet()
  console.log('wallet', connect)

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
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
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
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" type="image/x-icon" href="favicon.ico" />
          </Head>
          <Layout>
            <Header style={{ background: '#fff', padding: 10 }}>
              <Menu mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />


            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64 }}>
              {/* Pass children to the content area */}
              {children}
            </Content>
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