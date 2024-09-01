const {Router}=require('express');
const router=Router();
const {getCurrentUserData}=require('../controllers/usercontroller.js');
const {protectRoute,restrictTo}= require('../controllers/auth.controller.js');


router.get('/currentuserdata',protectRoute,getCurrentUserData);
module.exports=router;