import React from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'

const Index = () => {
  return (
    <>
        <Navbar/>
        <h1 className='font-bold text-5xl text-center my-5 underline'>Blogs</h1>
        <Post/>
        <Post/>
        <Post/>
    </>
  )
}

export default Index