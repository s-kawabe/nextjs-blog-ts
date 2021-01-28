# Next.jsチュートリアルの復習
## クライアントサイドのページ遷移(ナビゲーション)
Linkコンポーネントによって、同じNext.jsアプリ内にある２つのページ間のクライアント再度での
ナビゲーションが可能になる。

クライアントサイドのナビゲーションはページ遷移がJavaScriptを用いて行われるため
ブラウザによって行われるデフォルトのページ遷移よりも高速になる。

## コード分割とプリフェッチング
Next.js は自動的にコード分割を行うので、各ページはそのページに必要なものだけを読み込みます。
つまり、トップのページがレンダリングされたときに、
他のページのコードが最初からサーブされるわけではないということです。

Linkコンポーネントがブラウザのビューポートに表示されると
Next.jsは自動的にリンク先のページのコードをバックグラウンドで**プリフェッチ**する。
リンクをクリックするときまでには、目的のページのコードはバックグラウンドで読み込み済みになる！

> Next.jsのアプリ外のサイトへ遷移する場合はLinkでなく<a>タグで対応する。

## アセット
Next.jsは画像などの静的なファイルを、トップレベルのpublicディレクトリ配下で
サーブすることができます。pagesディレクトリと同様に、puclicないのファイルは
アプリケーションのルートから参照することができる。

## メタデータ
```tsx
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```
`Head`タグはNextに組み込まれているReactコンポーネント。
htmlにおける<head>タグ内の情報を変更する場合はこのHeadコンポーネントを利用する

> lang属性を加えるにはカスタムのDocumentコンポーネントを使用する。


# Next.jsチュートリアル＋以下で遊ぶ
- TypeScript
- ReduxToolkit
- ChakraUI
- Emotion

## Next.js固有の型
### 静的生成とサーバーサイドレンダリング
- getStaticProps<br>
  →GetStaticProps型を使う<br>
- getStaticPaths<br>
  →GetStaticPaths型を使う<br>
- getServerSideProps<br>
  →GetServerSideProps型を使う<br>

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

### APIルート
APIルートに組み込まれている型の使い方
```tsx
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // ...
}
```

### Appのカスタム
`pages/_app,js`をtsxにして`AppProps`というビルトインの型を使用することができる。
```tsx
import { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```

## index.tsのstyled-jsxからEmotionに変えてみる
### chakraUIとEmotionをインストールしてみる
```
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### Emotionの書き方
#### styledを使う
```tsx
import styled from '@emotion/styled'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  return (
    <Container>
    ...
    </Container>
```

#### css in propを使う
エラーになる... よくわからない