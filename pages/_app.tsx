/** @jsxImportSource @emotion/react */
import { jsx, css, Global } from '@emotion/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'ducks/createStore';

const global = css`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
  background: #D5E5E5;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Global styles={global} />
      <Component {...pageProps} />  
    </Provider>
  )
    
}