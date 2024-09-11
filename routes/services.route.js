const  express = require("express")
const router = express.Router()
const {protectRoute,restrictTo}= require('../controllers/auth.controller.js');
const { getServices,getServiceByID,addService, 
    updateServices,
    deleteService,uploadServicePhoto,
    downloadImage,searchService,searchServiceByCategory,getServiceByServiceProider } = require('../controllers/service.controller.js');
const multer=require('multer');


router.get("/",protectRoute,getServices);
router.get("/:id",getServiceByID);
router.post("/",protectRoute,restrictTo('provider'),uploadServicePhoto,addService);
router.get("/image/:filename",downloadImage);
router.get("/getServiceByProvider",protectRoute,getServiceByServiceProider)
router.post("/searchService",searchService);
router.post("/searchServiceByCategory",searchServiceByCategory);
//router.get("/image/:id",getServiceImageById);
router.put("/:id",protectRoute,restrictTo('provider'),updateServices);
router.delete("/:id",protectRoute,restrictTo('provider'),deleteService);



module.exports = router;



