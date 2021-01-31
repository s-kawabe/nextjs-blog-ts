/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import Link from 'next/link'
import { Box, Image, Flex } from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'

type Props = {
  name: string;
  home: boolean;
}

const Header: React.FC<Props> = ({name, home}) => {
  return (
    <header>
      {home ? (
        <Box boxShadow="0px 0px 10px #c0c0c0" bg="#81E6D9" w="100%" p={3} color="white">
          <Flex justify="center" align="center">
            <Image
              boxSize="4rem" 
              borderRadius="50%"       
              src="/images/profile.jpg"
              alt={name}
              mr={20}
            />
            <h2 css={css`text-shadow: 1px 1px 2px #707070`}>{name}`s Blog<SunIcon boxSize={40} ml={18}/></h2>
          </Flex>
        </Box>
      ) : (
        <Box boxShadow="0px 0px 10px #c0c0c0" bg="#81E6D9" w="100%" p={3} color="white">
          <Flex justify="center" align="center">
            <Link href="/">
              <a>
                <Image
                  boxSize="4rem" 
                  borderRadius="50%"
                  src="/images/profile.jpg"
                  alt={name}
                  mr={20}
                />
              </a>
            </Link>
            <h2 css={css`text-shadow: 1px 1px 2px #707070`}>
              <Link href="/">
                <a css={css`color: white;`}>{name}`s Blog<SunIcon boxSize={40} ml={18}/></a> 
              </Link>
            </h2>
          </Flex>
        </Box>
      )}
    </header>
  )
}

export default Header