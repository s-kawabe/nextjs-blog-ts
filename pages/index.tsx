import Head from 'next/head'
import Layout, { siteTitle } from '@/Layout';
import utilStyles from 'styles/utils.module.css';
import { getSortedPostsData } from 'lib/posts';
import Link from 'next/link'

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
      <section className={utilStyles.headingMd}>
        <p>Welcome to Shintaro's Blog</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({id,title,date}) => (
              <li className={utilStyles.listItem} key={id.toString()}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  {date}
                </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

// getting posts data before Home component rendering
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}