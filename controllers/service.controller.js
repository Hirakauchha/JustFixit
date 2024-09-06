const  express = require("express");
const Service= require('../models/service.js')
const multer=require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');
const {mongoURI}=require('../database/db.js');
const { MongoClient } = require("mongodb");
const GridFSBucket = require("mongodb").GridFSBucket
const mongoClient= new MongoClient(mongoURI);


const storage = new GridFsStorage({
   url: mongoURI,
   file: (req, file) => {
       return new Promise((resolve, reject) => {
           crypto.randomBytes(16, (err, buf) => {
               if (err) {
                   return reject(err);
               }
               const filename = buf.toString('hex') + path.extname(file.originalname);
               const fileInfo = {
                   filename: filename,
                   bucketName: 'uploads', 
               };
               resolve(fileInfo);
           });
       });
   }
});
const upload = multer({ storage });
const uploadServicePhoto= upload.single('image');

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
      const { name, description, price } = req.body;
        console.log(req.body);
        // Create a new service instance
        const service = new Service({
            name,
            description,
            price,
            image: req.file ? req.file.filename : null // Save the filename of the uploaded image
        });

        // Save the service to the database
        await service.save();

        // Return the newly created service with the image link
        res.status(201).json({
            status: 'success',
            data: {
                service,
                imageLink: req.file ? `/files/${req.file.filename}` : null // The link to access the image
            }
        });
      
   } catch (error) {
      res.status(500).json({message: error.message});

      
   }
 }
const downloadImage=async (req, res) => {
    try {
      await mongoClient.connect()
  
      const database = mongoClient.db("JustFix-API")
  
      const imageBucket = new GridFSBucket(database, {
        bucketName: "uploads",
      })
  
      let downloadStream = imageBucket.openDownloadStreamByName(
        req.params.filename
      )
  
      downloadStream.on("data", function (data) {
        return res.status(200).write(data)
      })
  
      downloadStream.on("error", function (data) {
        return res.status(404).send({ error: "Image not found" })
      })
  
      downloadStream.on("end", () => {
        return res.end()
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      })
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

 const searchService=async(req,res)=>{
  try {
    const {query}=req.body;
    const filter={
      
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
 }
 
 

 module.exports = {
    getServices,
    getServiceByID,
    addService,
    updateServices,
    deleteService,
    uploadServicePhoto,
    downloadImage
 }