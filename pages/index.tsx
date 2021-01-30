import Head from 'next/head'
import Layout, { siteTitle } from '@/Layout';
import { getSortedPostsData } from 'lib/posts';
import Link from 'next/link'
import { GetStaticProps } from 'next';

export type Posts = {
  id: string;
  title: string;
  date: string;
}

type Props = {
  allPostsData: Posts[]  
}

export default function Home({ allPostsData }: Props) {

  // const allPostsData: Posts[] = props.allPostsData

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>Welcome to Shintaro's Blog</p>
      </section>
      <section>
        <h2>Blog</h2>
        <ul>
          {
            allPostsData.map(({id,title,date}) => (
              <li key={id.toString()}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small>{date}</small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

// getting posts data before Home component rendering
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}