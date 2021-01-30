import Layout from '@/Layout'
import { getAllPostsIds, getPostData } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'

type Props = {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  }
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          {postData.date}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {  
    props: {
      postData
    }
  }
}
