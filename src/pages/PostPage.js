import { formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { UserContext } from '../contexts/UserContext';
const parse = require('html-react-parser');

const PostPage = () => {
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        // console.log(id)
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                // console.log(postInfo)
                setPostInfo(postInfo)
            })
        })
    }, [])

    if(!postInfo) return ''

    return (
        <>  
            <Navbar/>
            <div className='h-[100vh] w-[100vw] mt-0'>
                <h1 className='pt-6 pb-2 text-4xl text-center font-bolder'>{postInfo.title}</h1>
                <div className='block text-center'>
                    <time className='text-gray-400 text-xs'>at {formatISO9075(new Date(postInfo.createdAt))}</time>
                    <div className='text-gray-700 font-bold text-xs'>by @{postInfo.author.username}</div>
                </div>
                {userInfo.id === postInfo.author._id && (
                    <div className='text-center mt-4 flex items-center justify-center '>
                        <Link className='flex w-[160px] justify-center align-middle text-center p-2 bg-gray-800 text-gray-200' to={`/edit/${postInfo._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                            Edit this post
                            </Link>
                    </div>
                )}
                <div className='my-5'>
                    <img className='w-[90vw] mx-auto h-[500px] border-2 border-black' src={`http://localhost:4000/${postInfo.cover}`}></img>
                </div>
                    <div className='w-[90vw] mx-auto mt-3'>
                        <p className='leading-5'>{parse(postInfo.content)}</p>
                    </div>
                </div>
        </>
    )
}

export default PostPage