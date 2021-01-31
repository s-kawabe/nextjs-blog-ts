/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'
import Link from 'next/link'
import Header from '@/Header'
import Aside from '@/Aside'
import { Posts } from '../pages/index';
import { Box, Flex, IconButton, Icon } from '@chakra-ui/react';
import { MdHome } from 'react-icons/md'

const name = 'Shintaro'
export const siteTitle = 'Next.js Sample Website!'

type Props = {
  allPostsData?: Posts[];
  children: React.ReactNode
  home?: boolean
}

const HoverActionIconButton = styled(IconButton)`
  transition: 0.3s;
  &:hover {
    box-shadow: 3px 3px 8px #808080;
  }
`

const mainArea = css`
  width: 60vw;
  margin: 50px 10px 50px 50px;
  background-color: #EEEEEE;
  border-radius: 40px;
  padding: 30px;  
`

const catchIcon = () => {
  return <Icon as={MdHome} />
}

function Layout({ allPostsData, children, home }: Props) {
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
      <Flex alignItems="flex-start" justifyContent="center" >
        <main css={mainArea}>{ children }</main>
        <Aside allPostsData={allPostsData} />
      </Flex>
      {!home && (
        <div>
          <Link href="/">
            <a>
              <HoverActionIconButton
                m={40}
                p={10}
                position="fixed"
                left={20}
                bottom={20}
                color="teal"
                aria-label="Back to Top Page"
                fontSize="40px"
                borderRadius="50%"
                icon={catchIcon()}
              />
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout