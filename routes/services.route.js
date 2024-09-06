const  express = require("express")
const router = express.Router()
const {protectRoute,restrictTo}= require('../controllers/auth.controller.js');
const { getServices,getServiceByID,addService, updateServices,deleteService,uploadServicePhoto,getServiceImage,getServiceImageById } = require('../controllers/service.controller.js');
const multer=require('multer');


router.get("/",protectRoute,getServices);
router.get("/:id",getServiceByID);
router.post("/",uploadServicePhoto,addService);
router.get("/files/:filename",getServiceImage);
router.get("/image/:id",getServiceImageById);
router.put("/:id",protectRoute,restrictTo('provider'),updateServices);
router.delete("/:id",protectRoute,restrictTo('provider'),deleteService);



module.exports = router;



