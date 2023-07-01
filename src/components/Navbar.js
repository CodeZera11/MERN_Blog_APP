import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {

  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
      fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  }, [])
  
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: 'POST',
      credentials: 'include'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <div className='mb-0 flex justify-between w-full h-[4rem] bg-black text-white'>
        <div className='logo flex items-center text-xl hover:cursor-pointer mx-4'><Link to='/'>Blog App</Link></div>
            <div className='flex items-center'>
              {username && (
                <>
                  <Link className="mx-2 text-lg hover:text-red-600" to='/create'>Create a Post</Link>
                  <Link className="mx-3 text-lg mr-9 hover:text-red-600" to='/login' onClick={logout}>Logout</Link>
                </>
              )}
              {!username && (
                <>
                  <Link className="mx-2 text-lg hover:text-red-600" to='/login'>Login</Link>
                  <Link className="mx-3 text-lg mr-9 hover:text-red-600" to='/signup'>Signup</Link>
                </>
              )}

                
        </div>
    </div>
  )
}

export default Navbar