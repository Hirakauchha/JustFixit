const  express = require("express");
const Service= require('../models/service.js')
const multer=require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const {mongoURI,gfs}=require('../database/db.js');
// const multerStorage=multer.diskStorage(
//    {
//       destination:(req,file,cb)=>{
//          cb(null,'images/services')
//       },
//       filename:(req, file, cb)=>{
//            const ext= file.mimetype.split('/')[1];
//            cb(null,`service-${req.service._id}-${Date.now()}.${ext}`);
//       }
//    }
// );
// const multerFilter =(req,file,cb)=>{
//    if(file.mimetype.startsWith('image')){
//       cb(null,true);
//    }else{
//       cb(new AppError('Not an image. Please upload only image.',404),false);
//    }
// }

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
   console.log("hhiuhiu");
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
 const getServiceImage= async (req, res) => {
   try {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
         if (err) {
             return res.status(500).json({ error: err.message });
         }
         if (!file || file.length === 0) {
             return res.status(404).json({ error: 'No file found' });
         }

         // Create a read stream from GridFS
         const readstream = gfs.createReadStream(file.filename);
         readstream.on('error', (err) => {
             res.status(500).json({ error: err.message });
         });
         readstream.pipe(res);
     });
 } catch (error) {
       res.status(500).json({ err: error.message });
   }
};
const getServiceImageById= async (req, res) => {
   console.log(req.body);
   try {
      gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
         if (err) {
             return res.status(500).json({ error: err.message });
         }
         if (!file || file.length === 0) {
             return res.status(404).json({ error: 'No file found' });
         }

         // Create a read stream from GridFS
         const readstream = gfs.createReadStream(file.filename);
         readstream.on('error', (err) => {
             res.status(500).json({ error: err.message });
         });
         readstream.pipe(res);
     });
 } catch (error) {
       res.status(500).json({ err: error.message });
   }
};
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
    deleteService,
    uploadServicePhoto,
    getServiceImage,
    getServiceImageById
 }