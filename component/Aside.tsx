import { AtSignIcon } from '@chakra-ui/icons'
/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from '@emotion/react'
import { Posts } from '../pages/index';
import styled from '@emotion/styled';
import { Icon, Box, Flex, Text } from '@chakra-ui/react';
import { MdDescription } from "react-icons/md";
import Link from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Container = styled(Box)`
  width: 400px;
  margin: 50px 10px;
  background-color: #EEEEEE;
  padding: 20px;
`

const List = styled.li`
  list-style: none;
`

type Props = {
  allPostsData: Posts[]  
}

const Aside = ({ allPostsData }: Props): JSX.Element => {
  return (
    <Container>
      <section css={css`margin: 10px;`}>
        <Flex alignItems="center" justifyContent="left" borderBottom="3px solid #81E6D9">
          <h2 css={css`margin: 10px 0;`}>Blog</h2>
          <Icon ml={10} boxSize={30} as={MdDescription} color="#71D6C9" />
        </Flex>
        <ul css={css`padding: 0!important;`}>
          {
            allPostsData.map(({id,title,date}) => (
              <List key={id.toString()}>
                <Link href={`/posts/${id}`}>
                  <a css={css`
                    text-decoration: none!important;
                    cursor: pointer;
                  `}>
                    {title}
                  </a>
                </Link>
                <br/>
                <small css={css`color: gray`}>{date}</small>
              </List>
            ))
          }
        </ul>
      </section>
    </Container>
  )
}

export default Aside