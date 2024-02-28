const express=require('express');
const router=express.router();
const Job=require('../models/job');

router.post('/create',async(req,res)=>{
    try{
        const{
            CompanyName,
            Title,
            Description,
            LogoUrl,
            Salary,
            Location,
            Duration,
            LocationType
        }=req.body;
        console.log(CompanyName,Title,Description,LogoUrl,Salary,Location,Duration,LocationType);
        
        // checking if values are empty
        if(!CompanyName || !Title || !Description || !LogoUrl || !Salary || !Location || !Duration || !LocationType){
            return res.status(400).json
            ({errorMessage:"Bad request"});
        }

        // checking if Job already exists in Db
        const isExtistingJob=await Job.findOne({Title:Title, CompanyName:CompanyName, Description:Description, Salary:Salary, Location:Location})
            if(isExtistingJob)
            {
                return res.status(409).json({errorMessage:"Job already Exists in DataBase"});
            }
    }
    catch(error){
        console.log(error);
    }
});