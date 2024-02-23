const express=require('express');
const router=express.Router();
const User=require('../models/user');

router.post("/register",(req,res)=>{
    try{
        const {name,email,password}=req.body;
        
        // checking values if empty
        if(!name|| !email || !password)
        {
            return res.json({
                errorMessage:"Bad request"
            })
        }
        console.log(name,email,password);
    }
    catch(error){
        console.log(SyntaxError);
    }
    console.log("Inside register");
});

module.exports=router;