const {Router}=require('express');
const router=Router();
const {getCurrentUserData,updateCurrentUserData}=require('../controllers/usercontroller.js');
const {protectRoute,restrictTo}= require('../controllers/auth.controller.js');


router.get('/currentuserdata',protectRoute,getCurrentUserData);
router.patch('/updatecurrentuser',protectRoute,updateCurrentUserData);
module.exports=router;