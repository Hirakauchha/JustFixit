const  express = require("express")
const router = express.Router()
const {protectRoute,restrictTo}= require('../controllers/auth.controller.js');
const { getServices,getServiceByID,addService, updateServices,deleteService } = require('../controllers/service.controller.js');

router.get("/",protectRoute, getServices);
router.get("/:id",getServiceByID);
router.post("/",addService);
router.put("/:id",protectRoute,restrictTo('provider'),updateServices);
router.put("/:id",protectRoute,restrictTo('provider'),deleteService);



module.exports = router;



