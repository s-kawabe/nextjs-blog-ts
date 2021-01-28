# Next.jsチュートリアルプラス以下で遊ぶ
- TypeScript
- ReduxToolkit
- ChakraUI
- Emotion

# Next.js固有の型
## 静的生成とサーバ再度レンダリング
- getStaticProps 
  →　GetStaticProps型を使う
- getStaticPaths
  →　GetStaticPaths型を使う
- getServerSideProps
  →　GetServerSideProps型を使う

```tsx
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async context => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async context => {
  // ...
}
```

## APIルート
APIルートに組み込まれている型の使い方
```tsx
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // ...
}
```

## Appのカスタム
`pages/_app,js`をtsxにして`AppProps`というビルトインの型を使用することができる。
```tsx
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```