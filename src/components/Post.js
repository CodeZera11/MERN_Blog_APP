import React from 'react'
// import {format} from 'date-fns'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

const Post = (props) => {

  const {title, summary, cover, createdAt, author, postId} = props

  // console.log(title, summary, cover)
  console.log(author)

  return (
    <>
    <div className='container flex border-4 my-9 mx-auto p-4 w-[1000px]'>
        <div className='flex'>
            <Link to= {`/post/${postId}`}>
              <img className='h-[200px] w-[350px]' src={ 'http://localhost:4000/' + cover} alt="img.." srcset="" />
            </Link>
        </div>
        <div className='mx-4 border-4 p-5 w-[590px]'>
          <Link to= {`/post/${postId}`}>
            <h2 className='font-bold text-4xl'>{title}</h2>
          </Link>
            <div className='info flex my-2 flex-col'>
                <span className='text-gray-700 font-bold'>{author.username}</span>
                <time className='text-gray-400 text-xs'>at {formatISO9075(new Date(createdAt))}</time>
            </div>
            <p className='my-2 text-lg'>{summary}</p>
        </div>
    </div>
    </>
  )
}

export default Post