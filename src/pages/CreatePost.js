import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    const response = await fetch('http://localhost:4000/createpost', {
      method: 'POST',
      body: data,
      credentials: 'include'
    })

    if(response.ok){
      setRedirect(true);
    }

    console.log(await response.json())
  }

  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Navbar/>
      <div>
        <h1 className='text-center my-11 text-5xl font-extrabold underline tracking-wider'>Create Your Post</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col justify-center my-[70px]'>
            <input required type='text' name='title' value={title} id='title' className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' placeholder='Title' onChange={ev => setTitle(ev.target.value)}/>

            <input required type='text' name='summary' value={summary} id='summary' className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' placeholder='Summary' onChange={ev => setSummary(ev.target.value)}/>

            <input required name='file' id='file' type='file' className='focus:outline-none h-15 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' onChange={ev => setFiles(ev.target.files)}/>

            <ReactQuill required onChange={newValue => setContent(newValue)} className='mx-auto w-[80%] mt-6' theme="snow" modules={modules} formats={formats}/>

            <button className='my-5 rounded-xl p-1 hover:text-gray-200 hover:bg-gray-500 bg-gray-400 text-lg border-2 border-black w-[80%] mx-auto '>Create Post</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreatePost