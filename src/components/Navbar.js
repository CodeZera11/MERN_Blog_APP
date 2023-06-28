import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between w-full h-[4rem] bg-black text-white'>
        <div className='logo flex items-center text-xl hover:cursor-pointer mx-4'><Link to='/'>Blog App</Link></div>
            <div className='flex items-center'>
                <Link className="mx-2 text-lg hover:text-red-600" to='/login'>Login</Link>
                <Link className="mx-3 text-lg mr-9 hover:text-red-600" to='/signup'>Signup</Link>
        </div>
    </div>
  )
}

export default Navbar