const {Router}=require("express");
const router=Router();
const {createRequest}=require("../controllers/request.controller.js");
const {protectRoute}= require('../controllers/auth.controller.js');

router.post("/createrequest",protectRoute,createRequest);
module.exports=router;