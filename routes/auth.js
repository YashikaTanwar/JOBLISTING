const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
router.use(express.json());

router.post("/register",async(req,res)=>{
    try{
        console.log("hello");
        const { name, email, password}=req.body;
        console.log(name,email,password);
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
        const hashedpassword = await bcrypt.hash(password,10);
        const userData=new User({
            name,
            email,
            password : hashedpassword
        });

        // saving data in database
        await userData.save();
        res.json({message:"user registered successfully"});
    }

    catch(error){
        console.log(error);
    }
    console.log("Inside register");
});


router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                errorMessage:"Bad request"
            })
        }

        // if particular email exists 
        const userDetails=await User.findOne({email});
        // !userDetails --> this means user does not exists
        if(!userDetails){
            return res.status(401).json({errorMessage:"Invalid Credentials"});
        }

        // if user exists then we'll compare password
        const passwordMatched = await bcrypt.compare(password,userDetails.password);
        
        // if password does not matches
        if(!passwordMatched){
            return res.status(401).json({errorMessage:"Invalid User Credentials"});
        }

        const token=jwt.sign(
            {id:userDetails._id},
            process.env.SECRET_KEY);

        // if everthing works fine then this message will get printed
        res.json({
            message:"User Logged In",
            name:userDetails.name,
            token:token,
        });
    }
    catch(error){
        console.log(error);
    }
});
module.exports=router;