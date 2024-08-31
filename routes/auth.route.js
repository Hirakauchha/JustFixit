const {Router}=require('express');
const router=Router();
const { signUpUser,loginUser }=require('../controllers/auth.controller.js');

router.post('/signup',signUpUser);
router.post('/login',loginUser);
module.exports=router;