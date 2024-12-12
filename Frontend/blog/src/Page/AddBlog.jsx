import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Style/addblog.css";

function AddBlog() {
  const [blogTitle, setBlogTitle] = useState('');
  const [bloggerName, setBloggerName] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;  // No token means expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();  // Check expiration time
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken'); 

    // Check if the token is expired
    if (isTokenExpired(token)) {
      alert('Session expired. Please log in again.');
      navigate('/login');  // Redirect to login page
      return;
    }

    const blogData = {
      title: blogTitle,
      bloggerName:bloggerName,
      blog: blogContent,
      img: image,
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/blog/add/', blogData, config);

      if (response.status === 200) {
        alert('Blog created successfully!');
        navigate('/user'); 
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Error adding blog: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <>
      <Form className='daform' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formImageLink">
          <Form.Label className='daff1'>Add Image Link</Form.Label>
          <Form.Control
            className='dadf2'
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBlogTitle">
            <Form.Label className='daff1'>Blog Title</Form.Label>
            <Form.Control
              className='daf2'
              type="text"
              placeholder="Blog Title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formBloggerName">
            <Form.Label className='daff1'>Blogger Name</Form.Label>
            <Form.Control
              className='daf2'
              type="text"
              placeholder="Blogger Name"
              value={bloggerName}
              onChange={(e) => setBloggerName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formBlogContent">
            <Form.Label className='ddaff1'>Blog</Form.Label>
            <Form.Control
              as="textarea"
              placeholder='Blog'
              className='ddfa'
              rows={6}
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <Button variant="primary" className='dab1' type="submit">
          Add Blog
        </Button>
        <Link to={'/user'}>
          <Button className='dab1'>Back to Home</Button>
        </Link>
      </Form>
    </>
  );
}

export default AddBlog;
