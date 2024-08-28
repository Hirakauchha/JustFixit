const  express = require("express")


const getServices = async(req, res)=>{
    try {
     const service=await Service.find({});
     res.status(200).json(service);
     
    } catch (error) {
     res.status(500).json({message:error.message}); 
     
    }
 
 }

 module.exports = {
    getServices
 }