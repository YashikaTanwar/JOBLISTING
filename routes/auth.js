const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        
        // checking values if empty
        if(!name|| !email || !password)
        {
            return res.status(400).json({
                errorMessage:"Bad request"
            })
        }
        // checking if user already exists -> if already exists then will print already existing
        const isExistingUser = await User.findOne({email:email});
        if(isExistingUser)
        {
            return res.status(409).json({errorMessage:"User already exists"})
        };

        // for password we have to fetch data from client side so we use await  
        const hasedpassword = await bcrypt.hash(password,10);
        const userData=new User({
            name,
            email,
            password : hashedpassword
        });

        // saving data in database
        await userData.save();

    }

    catch(error){
        console.log(SyntaxError);
    }
    console.log("Inside register");
});

module.exports=router;