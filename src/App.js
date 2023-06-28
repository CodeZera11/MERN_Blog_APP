import { Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
