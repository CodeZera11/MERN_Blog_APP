import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Login = () => {

  const [credentials, setCredentials] = useState({username: "", password: ""})
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo} = useContext(UserContext);

  const {username, password} = credentials;

  const handleLogin = async (e) => {
    e.preventDefault();
    // API Call
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username,password}),
      credentials: 'include',
    })
    // console.log(res)
    if(res.ok){
      res.json().then(userInfo =>{
        setUserInfo(userInfo)
      })
      setRedirect(true);
    }else{
      alert("Wrong Credentials");
    }

  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  if(redirect === true){
    return <Navigate to={'/'} />
  }

  return (
    <div className='flex flex-col mx-auto w-[1000px] m-9'>
        <h1 className='text-5xl font-bold text-center my-2 underline'>Login</h1>
        <form className='flex flex-col my-[100px] p-3' onSubmit={handleLogin}>
            <input onChange={onChange} value={username} className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-300' type="name" id='username' name='username' placeholder='username'/>
            <input onChange={onChange} id='password' name='password' value={password} className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-300' type="password" placeholder='password'/>
            <button className='my-5 rounded-xl p-1 hover:text-gray-200 hover:bg-gray-500 bg-gray-400 text-lg border-2 border-black w-[100px] mx-auto'>Submit</button>
        </form>
    </div>
  )
}

export default Login