import Layout from '@/Layout'
import { getAllPostsIds, getPostData, getSortedPostsData } from 'lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { Posts } from '../index';

type Props = {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  }
  allPostsData: Posts[]
}

export default function Post({ postData, allPostsData }: Props) {
  return (
    <Layout allPostsData={allPostsData}>
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
  const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.id as string)
  return {  
    props: {
      allPostsData,
      postData
    }
  }
}
