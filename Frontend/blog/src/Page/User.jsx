import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Modal, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context';

function User() {
  const { user, setUser, loading } = useContext(UserContext); // Get user and loading state from context
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    number: '',
    id: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user.username,
        email: user.email,
        number: user.number,
        id: user._id,
      });
      fetchBlogs();
    }
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blog/view', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error.response ? error.response.data : error.message);
      setError("Failed to fetch blogs. Please try again later.");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log('Submit button clicked');
    console.log('Updated User:', updatedUser);

    try {
      const response = await axios.put(`http://localhost:5000/user/update/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      setUser(response.data);
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Failed to update user. Please try again.");
    }
  };

  // Redirect to login if user is not found after page reload
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login'); // Redirect to login page if user is not found
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading until user data is fetched
  }

  if (!user) {
    return <div>No user found. Please log in.</div>;
  }

  return (
    <>
      <div>
        <h1>Home Page</h1>
        <h2>User Name: {user?.username}</h2> {/* Conditional rendering to avoid accessing null */}
        <h4>Email: {user?.email}</h4>
        <h5>Number: {user?.number}</h5>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Container fluid="md">
        <Row>
          {blogs.length > 0 ? blogs.map((blog) => (
            <Col key={blog._id} md={6} lg={4} className="mb-2">
              <Link to={`/user/blog/${blog._id}`}>
                <Card className="Lcard">
                  <Card.Img
                    variant="top"
                    src={blog.img || 'defaultimg.jpg'}
                    className="card-img-top"
                  />
                  <Card.Body className="card-body-hover">
                    <Card.Title>Blog Title: {blog.title}</Card.Title>
                    <Card.Text>
                      Content: {blog.blog} <br />
                      Designer: {blog.bloggerName}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          )) : (
            <div>No blogs available</div>
          )}
        </Row>
      </Container>

      <Link to="/addblog">
        <Button>Add Blogs</Button>
      </Link>

      <Button variant="primary" onClick={handleShow} style={{ marginTop: '20px', marginRight: '10px' }}>
        Update Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={updatedUser.id}
                readOnly 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="text"
                name="number"
                value={updatedUser.number}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default User;
