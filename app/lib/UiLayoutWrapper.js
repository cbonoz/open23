'use client';

import { usePathname } from "next/navigation"
import { useWallet } from "./WalletProviderWrapper"
import Link from "next/link";
import { abbreviate, isAdminAddress } from "../util";
import { ACTIVE_CHAIN, APP_NAME } from "../constants";
import StyledComponentsRegistry from "./AntdRegistry";
import { Button, Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Image from "next/image";

function UiLayoutWrapper({ children }) {

    const pathname = usePathname()
    const { connect, wallet, logout } = useWallet()

    const menuItems = [
        {
            key: '/search',
            label: <Link href="/search">Search listings</Link>,
            href: '/search',
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

    const isAdmin = isAdminAddress(wallet?.address) 

    if (isAdmin) {
        menuItems.push({
            key: '/admin',
            label: <Link href="/admin">Admin</Link>,
            href: '/admin',
        })
    }

    return (
        <StyledComponentsRegistry>

            <Layout>
                <Header style={{ background: '#fff', display: 'flex' }}>
                    <Image src="/logo.png" alt="DataX Logo"
                        className='header-logo'
                        height={48}
                        onClick={() => {
                            window.location.href = '/'
                        }}
                        width={160}
                        />

                    <Menu style={{ minWidth: '800px' }}
                        mode="horizontal" defaultSelectedKeys={pathname} items={menuItems} />

                    <span style={{ float: 'right', right: 20, position: 'absolute' }}>
                        {!wallet?.address && <Button href="#" type="primary" onClick={connect}>Connect</Button>}
                        {wallet?.address && <span>{abbreviate(wallet?.address)}&nbsp;(<a href="#" onClick={logout}>logout</a>)</span>}
                    </span>


                </Header>
                    <span className='float-right bold active-network' >
                Active network: {ACTIVE_CHAIN.name}&nbsp;
                    </span>
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
    )
}

export default UiLayoutWrapper