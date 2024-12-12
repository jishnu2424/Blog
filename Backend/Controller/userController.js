const userDB =require('../Model/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
require ('dotenv').config()


const viewUser = async (req,res)=>{
    try{
        const users =await userDB.find()
        return res.status(200).send(users)

    }catch(err){
        return res.status(500).send(err)
    }
}


const viewuserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userDB.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const deleteUser =async(req,res)=>{
    try{
        const {id} = req.params
        await userDB.findByIdAndDelete(id)
        return res.status(200).send("Deleted")

    }catch(err){
        return res.status(500).send(err)
    }
}

const updateUser = async (req,res)=>{
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        const userData = req.body;
        
        const updateduser = await userDB.findByIdAndUpdate(id, userData, { new: true });

        if (!updateduser) {
            return res.status(404).send({ message: "User not found" });
        }

        console.log(updateduser);
        return res.status(200).send(updateduser);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}



module.exports={updateUser,viewUser,deleteUser,viewuserId}