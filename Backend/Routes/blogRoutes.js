const {Router} =require('express')
const blogController = require('../Controller/BlogController')
const {verifyToken} =require('../Middleware/middleware')
const route =Router()

route.post('/add',verifyToken,blogController.addBlog)

route.get('/view',verifyToken,blogController.viewBlog)

route.get('/viewall',blogController.viewAllBlog)

route.get('/viewdes/:id',blogController.viewBlogs)

route.get('/viewbyid/:id',blogController.viewBlogById)

route.patch('/update/:id',verifyToken,blogController.updateBlog)

route.delete('/delete/:id',blogController.deleteBlog)





module.exports=route