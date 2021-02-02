/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import Layout, { siteTitle } from '@/Layout';
import { getSortedPostsData } from 'lib/posts';
import { GetStaticProps } from 'next';
import styled from '@emotion/styled'
import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { AiFillGithub, AiFillTwitterCircle, AiFillInfoCircle } from 'react-icons/ai'
import Counter from '../component/Counter';
import postsSlice from '../ducks/posts/slice';

export type Posts = {
  id: string;
  title: string;
  date: string;
}

type Props = {
  allPostsData: Posts[]  
}

const HoverBox = styled(Box)`
  & div {
    transition: 0.3s!important;
  }
  &:hover div {
    transform: translateY(-10px);
  }
`

export default function Home({ allPostsData }: Props) {
  
  const dispatch = useDispatch()
  // Storeに格納する
  dispatch(postsSlice.actions.setAllPosts(allPostsData))


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box>
        <h2>Hi There ✋</h2>
        <p>My name is Shintaro. <br/>
        I am learning about front-end.<br/><br/>
        You can check it out here if you like! 👇
        </p>
        <Flex mb={30}>
          <a css={css`text-decoration: none!important;`} href="https://github.com/s-kawabe">
            <HoverBox>
              <p css={css`font-weight: bold;`}>Github</p>
              <div>
                <Icon as={AiFillGithub} boxSize={50}/>
              </div>
            </HoverBox>
          </a>
          <a css={css`text-decoration: none!important;`} href="https://twitter.com/shin_k_2281">
            <HoverBox ml={30}>
              <p css={css`font-weight: bold;`}>Twitter</p>
              <div>
                <Icon as={AiFillTwitterCircle} boxSize={50}/>
              </div>
            </HoverBox>
          </a>
          <a css={css`text-decoration: none!important;`} href="https://qiita.com/shin_k_2281">
            <HoverBox ml={30}>
              <p css={css`font-weight: bold;`}>Qiita</p>
              <div> 
                <Icon as={AiFillInfoCircle} boxSize={50}/>
              </div>
            </HoverBox>
          </a>
        </Flex>
        <h2>and, ReduxToolkit test 😌</h2>
        <Counter />
      </Box>
    </Layout>
  )
}

// getting posts data before Home component rendering
export const getStaticProps: GetStaticProps = async () => {
  // 記事を全件数取得
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}