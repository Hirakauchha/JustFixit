const  express = require("express");
const UserModel= require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');


const maxAge=9*24*60*60
const signToken = id => { 
    return jwt.sign({id:id},'justfixit-secret',{
        expiresIn:maxAge
    });
} 
const signUpUser =async(req, res)=>{
    try {
        
        const user=await UserModel.create(req.body);
        const token=signToken(user._id);
        res.status(201).json({
            status:'success',
            token,
            data:{
                user:user
            }
            });
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }    
 }
 const loginUser=async(req,res,next)=>{
    try {
        const {email, password}= req.body;
        if(!email||!password){
            return res.status(400).json({message:"Please provide both email and password"});
        }  
        const user= await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const checkPassword= await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token= signToken(user._id);
        res.status(200).json({
             status:'success',
             token,

        })
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
 }
 module.exports={
    signUpUser,loginUser
 }
 