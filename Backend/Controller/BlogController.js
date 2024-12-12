const jwt = require('jsonwebtoken')
const userDB =require('../Model/user')
const BlogDB = require('../Model/blog')
require('dotenv').config()

const addBlog = async (req, res) => {
    const tokenUserId = req.userId;  
    
    if (!tokenUserId) {
      return res.status(401).send("Unauthorized: Token expired or invalid.");
    }
  
    try {
      const body = req.body;
      const newBlog = await BlogDB.create({ ...body, owner: tokenUserId });
    
      await userDB.findByIdAndUpdate(tokenUserId, { $push: { blogs: newBlog._id } });
    
      console.log(newBlog);
      return res.status(200).send("Blog post created successfully.");
    } catch (err) {
      console.error("Error while creating blog post:", err);
      return res.status(500).send("Internal Server Error");
    }
  };
  
  

const viewBlog = async(req,res)=>{
    try{
        const userId = req.userId
        const findBlog =await BlogDB.find({owner:userId})
        if (!findBlog){
            return res.status(404).send("design not found")
        }
        return res.status(200).send(findBlog);

    }catch(err){
        console.log(err);
    }
}



const viewBlogs = async(req,res)=>{
    try{
        const { id } = req.params; 
        const findBlog =await BlogDB.find({owner:id})
        if (!findBlog){
            return res.status(404).send("design not found")
        }
        return res.status(200).send(findBlog);

    }catch(err){
        console.log(err);
    }
}



const viewAllBlog = async (req,res)=>{
    try {
        const Blog = await BlogDB.find()
        return res.status(200).send(Blog)
    } catch (error) {
        console.error(error);
    }
}

const viewBlogById = async (req, res) => {
    const { id } = req.params; 
    
    try {
        const blog = await BlogDB.findById(id);
        if (!blog) {
          return res.status(404).json({ message: "blog not found" });
        }
        return res.status(200).json(blog);
      } catch (error) {
        console.error("Error retrieving design:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};


const updateBlog = async (req, res) => {
    
        const { id } = req.params;
        const tokenUserId = req.userId;
        const body = req.body;

        try {
        const blog = await BlogDB.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "design not found" });
        }
        if (blog.owner.toString() !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized to update this design" });
        }
        await blog.updateOne(body);
        return res.status(200).json({ message: "design Updated" });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const findBlog = await BlogDB.findById(id);
        if (!findBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        await BlogDB.deleteOne({ _id: id });
        return res.status(200).json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};






    
module.exports ={addBlog,viewBlog,updateBlog,deleteBlog,viewAllBlog,viewBlogById,viewBlogs}