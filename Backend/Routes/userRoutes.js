const {Router} =require('express')
const userController = require('../Controller/userController')
const {verifyToken} = require('../Middleware/middleware')
const route =Router()

route.get('/view',userController.viewUser)

route.delete('/delete',userController.deleteUser)

route.put('/update/:id',userController.updateUser)

route.get('/viewid/:id',userController.viewuserId)

module.exports=route