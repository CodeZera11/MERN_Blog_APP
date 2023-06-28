import React from 'react'

const Post = () => {
  return (
    <>
    <div className='container flex border-4 my-9 mx-auto p-4'>
        <div className=''>
            <img className='w-[500px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eviAX7irCmaKX2aiYEtKzr9Inl2BevTb0RXFeKzgRAm4g6hkfXnTQsWjl_hTJUdB6dI&usqp=CAU" alt="img.." srcset="" />
        </div>
        <div className='mx-4 border-4 max-w-3xl p-5'>
            <h2 className='font-bold text-4xl'>Full house battery backup coming soon</h2>
            <p className='my-2 text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ad repellat deserunt? Magni ducimus modi placeat impedit veniam dolorum reiciendis labore, velit sapiente. Necessitatibus eveniet quibusdam vel placeat consectetur aspernatur similique ratione dolor quia! Inventore.</p>
        </div>
    </div>
    </>
  )
}

export default Post