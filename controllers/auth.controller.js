const  express = require("express");
const {promisify}= require('util');
const UserModel= require('../models/user.model.js')
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const maxAge=9*24*60*60
const secretkey='justfixit-secret'
const signToken = id => { 
    return jwt.sign({id:id},secretkey,{
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
             user_type:user.user_type

        })
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
 }
 const protectRoute=async(req,res,next)=>{
    try {
        let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({message:"No authorized no token"}); 
    }
    //token verification 
    const decoded=await promisify(jwt.verify)(token,secretkey);
    
    //checking if user still exist
    const currentUser= await UserModel.findById(decoded.id);
    if(!currentUser){
        return res.status(401).json({ message: "The user no longer exists with this token"});
    }
    req.user=currentUser;
    next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
 }
 const restrictTo=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.user_type)){
            return res.status(403).json({message:"You donot have permission to perform this action"})
        }
        next();
    }
    
 }
 module.exports={
    signUpUser,loginUser,protectRoute,restrictTo
 }
 