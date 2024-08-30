const  express = require("express")
const router = express.Router()
const { getServices,getServiceByID,addService, updateServices } = require('../controllers/service.controller.js');

router.get("/", getServices);
router.get("/:id",getServiceByID);
router.post("/",addService);
router.put("/:id",updateServices);


module.exports = router;



