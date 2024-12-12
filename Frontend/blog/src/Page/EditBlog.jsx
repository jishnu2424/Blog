import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Style/editblog.css'

function EditBlog() {
  return (
    <div>

<Form className='daform' >
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label className='daff1'>Add Image</Form.Label>
          <Form.Control className='dadf2' type="file" placeholder="Add Photo" id='photo-input' />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDesignName">
            <Form.Label className='daff1'>Blog Title</Form.Label>
            <Form.Control
              className='daf2'
              type="text"
              placeholder="Blog Title"
              name="designName"
              
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formDesignerName">
            <Form.Label className='daff1'>Blogger Name</Form.Label>
            <Form.Control
              className='daf2'
              type="text"
              placeholder="Blogger Name"
              name="designerName"
              
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formDesignDescription">
            <Form.Label className='ddaff1'>Blog</Form.Label>
            <Form.Control
              as="textarea"
              placeholder='Blog'
              className='ddfa'
              rows={6}
              name="designDescription"
              
            />
          </Form.Group>
        </Row>

        

        <Button variant="primary" className='dab1' type="submit">
          Update Blog
        </Button>
        <Link to={'/user'}><Button className='dab1'>Back to Home</Button></Link>
      </Form>
    </div>
  )
}

export default EditBlog