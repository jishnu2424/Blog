const  express = require('express');
require ('./DataBase/DB.js')
const authRoute =require('./Routes/authRoutes.js');
const userRoute =require('./Routes/userRoutes');
const blogRoute = require('./Routes/blogRoutes');
const cors =require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/blog',blogRoute)


app.listen(5000,()=>{
    console.log("server running");
})