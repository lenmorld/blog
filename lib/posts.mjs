import fs from 'fs'
import grayMatter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

// blog posts in /posts directory
const POSTS_DIR = 'posts'
const POSTS_PATH = path.join(process.cwd()
, POSTS_DIR) 

export function getPosts() {
    // get filenames
    const fileNames = fs.readdirSync(POSTS_DIR)
    console.log("fileNames: ", fileNames)    
    
    const postsData = []

    // gather posts data from each file
    fileNames.forEach(fileName => {
        // crete id from filename - remove .md extension
        // my-first-post
        const id = fileName.replace('.md', '')
        
        // read file
        const filePath = path.join(POSTS_PATH, fileName)
        const fileContents = fs.readFileSync(filePath)

        // parse file contents
        const parsed = grayMatter(fileContents)
        const metadata = parsed.data
        const body = parsed.content

        console.log("metaData.data: ", metadata)
        // TODO: we'll use the body after when we generate the page
        // console.log("metaData.content: ", body)

        // get id, title, date for each
        postsData.push({
            id: id,
            title: metadata.title,
            date: metadata.date
        })
    })

    return postsData
}

export function getPostIds() {
    const fileNames = fs.readdirSync(POSTS_PATH)

    const postIds = fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace('.md', '')
            }
        }
    })

    return postIds
}

export async function getPostDataById(postId){
    // read file
    const filePath = path.join(POSTS_PATH, postId + '.md')
    const fileContents = fs.readFileSync(filePath)

    // parse file contents
    const parsed = grayMatter(fileContents)
    const metadata = parsed.data
    const body = parsed.content

    // parse markdown to HTML using remark
    const processedContent = await remark()
        .use(html)
        .process(body)

    const resultHtml = processedContent.toString()

    // TODO: we'll use the body after when we generate the page
    // console.log("metaData.content: ", body)

    return {
        id: postId,
        title: metadata.title,
        date: metadata.date,
        content: resultHtml
    }
}

// const allPostsData = getPosts()
// console.log(allPostsData)

// const allPostIds = getPostIds()
// console.log("allPostIds: ", allPostIds)

// const allPostsData = getPosts()
// console.log(allPostsData)