import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

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

const EditPage = () => {
    
    const {id} = useParams(); 
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id).then((response)=>{
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setSummary(postInfo.summary)
                setContent(postInfo.content)

            })
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id)
        if(files?.[0]){
            data.set('file', files?.[0]);
        }
        await fetch('http://localhost:4000/post', {
            method: "PUT",
            body: data,
            credentials: 'include'
        });

        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }

    return (
        <>
            <Navbar/>

            <div>
                <h1 className='text-center my-11 text-5xl font-extrabold underline tracking-wider'>Edit Your Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center my-[70px]'>
                    <input required type='text' name='title' value={title} id='title' className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' placeholder='Title' onChange={ev => setTitle(ev.target.value)}/>

                    <input required type='text' name='summary' value={summary} id='summary' className='focus:outline-none h-10 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' placeholder='Summary' onChange={ev => setSummary(ev.target.value)}/>

                    <input name='file' id='file' type='file' className='focus:outline-none h-15 border-2 p-2 border-black my-2 rounded-xl text-lg bg-gray-200 w-[80%] mx-auto' onChange={ev => setFiles(ev.target.files)}/>

                    <ReactQuill required value={content} onChange={newValue => setContent(newValue)} className='mx-auto w-[80%] mt-6' theme="snow" modules={modules} formats={formats}/>

                    <button className='my-5 rounded-xl p-1 hover:text-gray-200 hover:bg-gray-500 bg-gray-400 text-lg border-2 border-black w-[80%] mx-auto'>Update Post</button>
          </div>
        </form>
      </div>
        </>
    )
}

export default EditPage