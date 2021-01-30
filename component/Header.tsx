/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import Link from 'next/link'
import { Box, Image } from '@chakra-ui/react'

const Header = ({name,home}) => {
  return (
    <header>
      {home ? (
        <Box bg="#81E6D9" w="100%" p={3} color="white">
          <img 
            src="/images/profile.jpg"
            css={css`width: 6rem; height: 6rem; border-radius: 50%;`}
            alt={name}
          />
          <h2>{name}`s Blog</h2>
        </Box>
      ) : (
        <Box bg="#81E6D9" w="100%" p={3} color="white">
          <Link href="/">
            <a>
              <img
                src="/images/profile.jpg"
                css={css`width: 6rem; height: 6rem; border-radius: 50%;`}
                alt={name}
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a css={css`color: white;`}>{name}`s Blog</a> 
            </Link>
          </h2>
        </Box>
      )}
    </header>
  )
}

export default Header