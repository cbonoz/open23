import Head from 'next/head';
import Script from 'next/script';
import UiLayoutWrapper from './lib/UiLayoutWrapper';

import { WalletProviderWrapper } from './lib/WalletProviderWrapper';

import './globals.css';

export default function RootLayout({ children }) {

  return (<html>
    <Script async src="https://saturn.tech/widget.js" />
    <head>
      <link rel="preload" href="/fonts/AdelleSans-Regular.woff" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/AdelleSans-Regular.woff2" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/AdelleSans-Semibold.woff" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/AdelleSans-Semibold.woff2" as="font" crossOrigin="" />

      <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
      {/* <link rel="icon" href="/favicons/icon.ico" type="image/svg+xml" /> */}
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="manifest" href="/favicons/manifest.json" />

      <title>DataX | Open data collective and marketplace</title>
      <meta name="description" content="Privy Auth Starter" />
    </head>
    <body>
      <WalletProviderWrapper>
        <UiLayoutWrapper>
          {children}
        </UiLayoutWrapper>
      </WalletProviderWrapper>
    </body>
  </html>
  )

}