import React, { useEffect, useState } from 'react';
import '../Style/landing.css';
import { Card, Col, Container, Row } from 'react-bootstrap';

function Landing() {
  const [blogs, setBlogs] = useState([]); // State to store blogs

  useEffect(() => {
    fetch('http://localhost:5000/blog/viewall/')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <>
      <div>
        <Container fluid="md">
          <Row>
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <Col key={index} md={6} lg={4} className="mb-2">
                  <Card className='Lcard'>
                    <Card.Img 
                      variant="top" 
                      src={item.img || 'default-image.jpg'} 
                      style={{height:"400px"}}
                      className="card-img-top" 
                    />
                    <Card.Body className="card-body-hover">
                      <Card.Title>Art Name: {item.title}</Card.Title>
                      <Card.Text>
                        Blogger : {item.bloggerName} <br />
                        Blog: {item.blog}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Landing;
