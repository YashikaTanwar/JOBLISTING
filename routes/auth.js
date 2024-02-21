const express=require('express');
const router=express.Router();
const User=require('../models/user');

router.post("/register",(req,res)=>{
    console.log("Inside register");
});