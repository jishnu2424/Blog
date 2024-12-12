import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function BlogDetailUser() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/viewbyid/${id}`
        );
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching the blog:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/blog/delete/${id}`);
        navigate("/user");
      } catch (error) {
        console.error(
          "Error deleting the blog:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Img
              variant="top"
              src={blog.img || "default-image.jpg"}
              className="card-img-top"
            />
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.blog}</Card.Text>
              <p>
                <strong>Created By:</strong> {blog.bloggerName}
              </p>
              <Button
                variant="primary"
                as={Link}
                to={`/updateblog/${id}`}
                className="me-2"
              >
                Update Blog
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Blog
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogDetailUser;
