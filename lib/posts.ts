import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Posts } from '../pages/index';
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

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

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // using `gray-matter` to parse the metadata part of a post
  const matterresult = matter(fileContents)

  const processedcontent = await remark()
    .use(html)
    .process(matterresult.content)
  const contentHtml = processedcontent.toString()

  // combine to data and id
  return {
    id,
    contentHtml,
    ...matterresult.data
  }
}

export function getSortedPostsData(): Posts[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName: string): Posts => {
    const id = fileName.replace(/\.md$/, '')

    // reads markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // using `gray-matter` to parse the metadata part of a post
    const matterResult = matter(fileContents)

    // combine to data and id
    return {
      id,
      ...matterResult.data
    } as Posts
  })

  // sorting post date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}