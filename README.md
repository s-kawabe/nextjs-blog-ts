# Next.jsチュートリアルの復習
## クライアントサイドのページ遷移(ナビゲーション)
Linkコンポーネントによって、同じNext.jsアプリ内にある２つのページ間の<br>
クライアントサイドでのナビゲーションが可能になる。<br>

クライアントサイドのナビゲーションはページ遷移がJavaScriptを用いて行われるため<br>
ブラウザによって行われるデフォルトのページ遷移よりも高速になる。<br>

## コード分割とプリフェッチング
Next.js は自動的にコード分割を行うので、各ページはそのページに必要なものだけを読み込みます。<br>
つまり、トップのページがレンダリングされたときに、<br>
他のページのコードが最初からサーブされるわけではないということです。<br>

Linkコンポーネントがブラウザのビューポートに表示されると<br>
Next.jsは自動的にリンク先のページのコードをバックグラウンドで**プリフェッチ**する。<br>
リンクをクリックするときまでには、目的のページのコードはバックグラウンドで読み込み済みになる！<br>

> Next.jsのアプリ外のサイトへ遷移する場合はLinkでなく<a>タグで対応する。

## アセット
Next.jsは画像などの静的なファイルを、トップレベルのpublicディレクトリ配下で<br>
サーブすることができます。pagesディレクトリと同様に、puclicないのファイルは<br>
アプリケーションのルートから参照することができる。<br>

## メタデータ
```tsx
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```
`Head`タグはNextに組み込まれているReactコンポーネント。<br>
htmlにおける<head>タグ内の情報を変更する場合はこのHeadコンポーネントを利用する<br>

> lang属性を加えるにはカスタムのDocumentコンポーネントを使用する。

## CSSModules
- `pages/_app.js`でインポートしたCSSはコンポーネント全体に効かせることができる
- CSSモジュールを使う為には`*.module.css`という名前のCSSファイルをインポートすればよい

## プリレンダリングとデータフェッチング
### プリレンダリングとは
Next.jsはクライアント側のJavaScriptで全てのレンダリングを行うのではなく<br>
あらかじめ各ページのHTMLを生成しておく動きをする。<br>
これによってパフォーマンスとSEOが向上する。<br><br>

これによって、Next.jsで作られたサイトはJavaScriptをオフにして閲覧しても<br>
JavaScriptでHTMLを作ることがない為、正常に閲覧できる。<br>
これはCRAによるアプリでは不可能。<br><br>

**ハイドレーション**<br>
生成された各HTMLはそのページに必要な最小限のJavaScriptコードを関連付けられる。<br>
ブラウザによってページが読み込まれると、そのページのJavaScriptコードが実行されてページが<br>
完全にインタラクティブなものになる。

### SSG
- ビルド時にHTMLを生成するプリレンダリング手法。<br>
  プリレンダリングされたHTMLは各リクエストに対して再利用される。

### SSR
- 毎回のリクエストごとにHTMLを生成するプリレンダリング手法。

### どっちを使えばいい？
基本的にはSSGを使用することが推奨されている。<br>
ページは一度ビルドされるとCDNによって提供されるので<br>
毎回のリクエストに対してサーバーサイドレンダリングを行うより<br>
はるかに高速になる。SSG推奨のページの例<br>
- マーケティングページ
- ブログ記事
- Eコマースの商品リスト
- ヘルプやドキュメンテーション<br><br>

**このページをユーザのリクエストによって先立ってプリレンダリングすることができるか？**<br>
がyesならSSGを選択するべき。

**ユーザのリクエストに先立ってページをプリレンダリングできないページはSSGは非推奨。**<br>
頻繁に更新されるページや、毎回のリクエストごとに内容が変わるページなど。

### ページごとの外部データ有無による静的生成の動き
静的生成はデータがある場合もない場合も行うことができる。<br>
Vercelでビルド時、そのページが外部データを取得しない静的ページの場合は<br>
自動的にSSGとして処理される。<br><br>

一方、外部データありの場合のSSGの方法もある。<br>
1. 本番環境様にアプリをビルド
2. このタイミングで外部データを取得してしまう
3. データを取得したあとでないとページを生成できない
→この場合に`getStaticProps`を使用する<br>

```tsx
export default function Home(props) { ... }

// 外部データがいるけどSSGしたいページの場合のメソッド
// 「このページはコンテンツの一部にデータの依存関係があるので、それを解決してからプリレンダリングして！」
export async function getStaticProps() {
    // ファイルシステムや API、DB などから外部データを取得する
    const data = ...

    // `props` キーに対応する値が `Home` コンポーネントに渡される
    return {
        props: ...
    }
}
```

### 外部データを取得してSSRする
ページから`getServerSideProps`をexportする。<br>
リクエストごとに外部データを取得してHTMLをレンダリングする。<br>
```tsx
export async function getServerSideProps(context) {
  return {
    props: {
      // コンポーネントに渡すための props
    }
  }
}
```
毎回のリクエストに対してサーバーはレンダリング処理を行わなくてはならないため<br>
処理結果は追加の設定をしない限りSSGのようにCDNにキャッシュしておくこともできない。

### データプリレンダリングの必要がないCSR
- 外部データを必要としないページの部分を静的生成する
- ページが読み込まれたら、クライアント側でJavaScriptを使って外部データを
  取得して(クライアントfetch)、残る部分にデータを埋め込む
  （つまりこれは普通のJavaScriptでfetchでAPIからデータをとってくる動き）<br>
→ユーザのダッシュボードページなどは、ユーザ固有であり、データも頻繁に更新されるため
 ページをプリレンダリングする必要もなくSEOも関係ない。

 ## 動的ルーティング
- `pages/posts/[id].js`といったファイル動的なページと判断される<br>

例として`[id].js`ではブログ投稿記事と想定すると<br>
以下の様に`getStaticPaths`というasync関数をexportして<br>
この関数の中ではidとして**とりうる値のリスト**を返す必要がある<br>

```tsx
import Layout from '../../components/layout'

export default function Post() {
  return <Layout>...</Layout>
}

export async function getStaticPaths() {
  // id としてとりうる値のリストを返す
}

export async function getStaticProps({ params }) {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
}
```

`getStaticProps`に含まれるparamsには`getStaticPaths`で取得した<br>
idが含まれているということになる。<br>


### 例:[id].tsxの実装
**`posts.ts側`**
```tsx
type ReturnAllIds = 
{
  params: {
    id: string;
  }
}

export function getAllPostsIds(): ReturnAllIds[] {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map((fileName: string): ReturnAllIds => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
```
この関数をgetStaticPathsで呼び出す。<br>
returnするオブジェクトはこの形([{ params: { id: *** } }])<br>
でないとgetStaticPathsは失敗してしまう。<br><br>

**`[id].tsx側`**
```tsx
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {  
    props: {
      postData
    }
  }
}

```

### 動的ルーティングのTips
#### 外部APIを取得orデータベースへの問合せ
`getStaticPaths`はどんなデータソースからもデータを取得することができる。
getStaticPostIdsを書き換えて外部のAPIエンドポイントからデータをフェッチしてもよい。
```tsx
export async function getAllPostIds() {
  // ファイルシステムの代わりに
  // 外部の API エンドポイントから投稿データを取得する
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
```

#### Fallbackについて
`getStaticPaths`の`fallback: false`について<br>
**falseの場合**はgetStaticPathsからreturnされていないあらゆるパスは<br>
アクセスすると404ページになる<br><br>

**trueの場合**は
- getStaticPathsからreturnされたパスはビルド時にHTMLとしてレンダーされる
- ビルド時に生成されなかったパスにアクセスしても404にならず<br>
  Next.jsはそういったパスへの最初のリクエスト時にそのページの「fallback」バージョンを提供する
- バックグラウンドでは、Next.jsはリクエストがあったパスを静的に生成する。
  同じページに対するそれ以降のリクエストに対しては、その生成されたページが提供される。

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
  )
}
```

#### css in propを使う
```tsx
const container = css`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  return(
    <div css={container}>
    ...
    </div>
  )
}
```

**そのままやるとエラーになる問題**<br>
公式からは
```
/** @jsx jsx **/
```
というプラグマをかけと言われるがReact17からは<br>
pragma and pragmaFrag cannot be set when runtime is automatic.<br>
と怒られてしまうので、`/** @jsxImportSource @emotion/react */`<br>
というプラグマを書く<br>
```
yarn add --dev @emotion/babel-preset-css-prop
```
https://qiita.com/282Haniwa/items/243f00c39ee7c992d7f7

#### グローバルスタイルを適用する
→@emotion/react のGlobalコンポーネントを使う

```tsx
/** @jsxImportSource @emotion/react */
import { jsx, css, Global } from '@emotion/react'

const global = css`
  * {
    font-family: serif;
  }
`

function Layout({ children }) {
  return (
    <>
      <Global styles={global} />
      { children }
    </>
  )
}

export default Layout
```
_app.tsxなどに設定してemoion-resetなどを適用すると良さそう<br>
Layoutというコンポーネントをわざわざ咬ませなくても良さそう。<br>