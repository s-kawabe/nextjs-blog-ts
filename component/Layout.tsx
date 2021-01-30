/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '@/Header'

const name = 'Shintaro'
export const siteTitle = 'Next.js Sample Website!'

type Props = {
  children: React.ReactNode
  home?: boolean
}

function Layout({ children, home }: Props) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header name={name} home={home} />
      <main>{ children }</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout