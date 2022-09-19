const express=require('express');
const { login, signUp } = require('../../controllers/auth/auth');
const router=express.Router();

router.post("/signUp",signUp);
router.post("/login",login);

module.exports=router;