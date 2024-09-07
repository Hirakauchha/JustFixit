const {Router}=require("express");
const router=Router();
const {createRequest,getRequestHistoryofConsumer,getAllRequest}=require("../controllers/request.controller.js");
const {protectRoute}= require('../controllers/auth.controller.js');

router.post("/createrequest",protectRoute,createRequest);
router.get("/requestHistory",protectRoute,getRequestHistoryofConsumer);
router.get("/viewYourRequest",protectRoute,getAllRequest);
module.exports=router;