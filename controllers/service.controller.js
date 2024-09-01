const  express = require("express");
const Service= require('../models/service.js')

const getServices = async(req, res)=>{
    try {
     const service=await Service.find({});
     res.status(200).json(service);
     
    } catch (error) {
     res.status(500).json({message:error.message}); 
     
    }
 
 }
 const getServiceByID=async(req, res)=>{
   try {
      const { id }=req.params;
      const service=await Service.findById(id);
      res.status(200).json(service);
      
   } catch (error) {
      res.status(500).json({message:error.message}); 

      
   }
 } 
 const addService=async(req,res)=>{
   try {
      const service= await Service.create(req.body);
      res.status(200).json(service);
      
   } catch (error) {
      res.status(500).json({message: error.message});

      
   }
 }
 const updateServices=async(req,res)=>{
   try {
      const{id}=req.params;
      const service=await Service.findByIdAndUpdate(id,req.body);
      if(!service){
         return res.status(404).json({message:"Service not found"});
      }
      const updateservice= await Service.findById(id);
      res.status(200).json(updateservice);
   } catch (error) {
      res.status(500).json({message: error.message});
      
   }
 }
 const deleteService=async(req,res)=>{
   try {
      const {id}= req.params;
      const service=await Service.findByIdAndDelete(id);
      if(!product){
          return res.status(404).json({message:"Service not found"});
      }
      
      res.status(200).json({message:"Service deleted sucessfully"});
   } catch (error) {
      res.status(500).json({message: error.message});
      
   }
 }

 
 

 module.exports = {
    getServices,
    getServiceByID,
    addService,
    updateServices,
    deleteService
 }