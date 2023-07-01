import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

const Index = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts=>{
        setPosts(posts)
      })
    })
  }, [])

  return (
    <>
        <Navbar/>
        <h1 className='font-bold text-5xl text-center my-5 underline'>Blogs</h1>
        {posts.length > 0 && posts.map((post)=>{
            // console.log(post.cover)
            return <Post author={post.author} postId={post._id} title={post.title} summary={post.summary} cover={post.cover} createdAt={post.createdAt}/>
        })}
    </>
  )
}


export default Index