const {Router} =require('express')
const authController = require('../Controller/authController')
const route = Router()

route.post('/add/user',authController.addUser)

route.post('/login/user',authController.loginUser)


module.exports=route
