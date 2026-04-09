import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from "react-router";

import AllBlogs from "./views/AllBlogs.jsx";
import EditBlog from "./views/EditBlog.jsx";
import NewBlog from "./views/NewBlog.jsx";
import ReadBlog from "./views/ReadBlog.jsx";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";

createRoot(document.getElementById('root')).render(  
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AllBlogs />} />
            <Route path='/edit/:id' element={<EditBlog />} />
            <Route path='/new' element={<NewBlog />} />
            <Route path='/read/:slug' element={<ReadBlog />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
    </BrowserRouter>
  
)
