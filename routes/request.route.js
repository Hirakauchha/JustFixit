const {Router}=require("express");
const router=Router();
const {createRequest,getRequestHistoryofConsumer,getAllRequest,cancelRequest,approveRequest}=require("../controllers/request.controller.js");
const {protectRoute, restrictTo}= require('../controllers/auth.controller.js');

router.post("/createrequest",protectRoute,createRequest);
router.get("/requestHistory",protectRoute,getRequestHistoryofConsumer);
router.get("/viewYourRequest",protectRoute,getAllRequest);
router.patch("/cancelRequest/:id",protectRoute,restrictTo("provider"),cancelRequest);
router.patch("/approveRequest/:id",protectRoute,restrictTo("provider"),approveRequest);
module.exports=router;