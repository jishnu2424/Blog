import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from '../Components/Nav';
import Landing from '../Page/Landing';
import Login from '../Page/Login';
import Register from '../Page/Register';
import User from '../Page/User';
import AddBlog from '../Page/AddBlog';
import DeleteBlog from '../Page/DeleteBlog';
import EditBlog from '../Page/EditBlog';
import BlogDetailUser from '../Page/BlogDetailUser';

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/addblog' element={<AddBlog />} />
          <Route path='/blogdelete' element={<DeleteBlog />} />
          <Route path='/update' element={<EditBlog />} />
          <Route path="/user/blog/:id" element={<BlogDetailUser />} /> {/* Corrected this line */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
