const express=require('express');
const router=express.Router();
const Job=require('../models/job');
const verifyToken=require('../middleware/authMiddleware');

// verifyToken is a middleware which we have created and here it is used for authentication
// allows to create job post in DB
router.post('/create',verifyToken,async(req,res,next)=>{
    try{        
        // fetching values (from req.body) and storing it in body (database)
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

        // checking if all values are present
        // here we are handling all the errors manually but we can also use a third party package
        // YUP / JOI
        if(!CompanyName || !Title || !Description || !LogoUrl || !Salary || !Location || !Duration || !LocationType){
            return res.status(400).json({errorMessage:"Bad request"});
        }

        // checking if Job already exists in Db
        const isExtistingJob=await Job.findOne({Title:Title, CompanyName:CompanyName, Description:Description, Salary:Salary, Location:Location})
            if(isExtistingJob)
            {
                return res.status(409).json({errorMessage:"Job already Exists in DataBase"});
            }

        // Object creation
            const jobDetails=new jobDetails({
            CompanyName,
            Title,
            Description,
            LogoUrl,
            Salary,
            Location,
            Duration,
            LocationType
        });

        await jobDetails.save();
        res.json({message:"Job created successfully"});
    }
    catch(error){
        next(error);
    }
});

//:jobId --> parameter
router.get('/details:jobId',async(req,res,next)=>{
    try{
        const jobId=req.params.jobId;
        if(!jobId)
        {
            return req.status(400).json({message:"Bad request"});
        }
        // finds job using jobID
        const jobDetails=await Job.findById(jobId);
        res.json({data:jobDetails});
    }
    catch(error)
    {
        next(error);
    }
});

module.exports=router;