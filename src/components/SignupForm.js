import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

const Signup = () => {

  const [credentials, setCredentials] = useState({username: "", password: ""});
  const [redirect, setRedirect] = useState(false)

  const {username, password} = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API Call
        const res = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
        // console.log(res)

        if(res.status === 200){
            console.log("Registration Successfull");
            setRedirect(true);
        }else{
            console.log("Registration Failed");
        } 
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className='flex flex-col mx-auto w-[1000px] m-9'>
        <h1 className='text-5xl font-bold text-center my-2 underline'>Signup</h1>
        <form className='flex flex-col my-[100px] p-3' onSubmit={handleSubmit}>
            <input onChange={onChange} value={username} className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-300' type="name" id='username' name='username' placeholder='username'/>
            <input onChange={onChange} id='password' name='password' value={password} className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-300' type="password" placeholder='password'/>
            <button className='my-5 rounded-xl p-1 hover:text-gray-200 hover:bg-gray-500 bg-gray-400 text-lg border-2 border-black w-[100px] mx-auto'>Submit</button>
        </form>
    </div>
  )
}

export default Signup