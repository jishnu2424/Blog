import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Style/deleteblog.css';

function DeleteBlog() {
  return (
    <>
<div className="dddpage">
      <h1 className="ddh1">Blog Detail</h1>
        <div  className="design-detail">
          <img
            src=""
            alt="gjddutdut"
            className="dddimg"
          />
          <h2 className="ddh11">Blog Name :item.Blogname</h2>
          <p className="dddp">
             Blog: item.Blog
          </p>
          <Link to={`/user/blogdelete/update`}>
            <Button className="dddbtn">Update</Button>
          </Link>
          <Button className="dbdbtn">Delete</Button>
        </div>
    </div>
    </>
  )
}

export default DeleteBlog