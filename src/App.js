import { Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContextProvider } from './contexts/UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div>
      <UserContextProvider>
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/create" element={<CreatePost/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
            <Route path="/edit/:id" element={<EditPage/>}/>
          </Routes>      
      </UserContextProvider>
    </div>
  );
}

export default App;
