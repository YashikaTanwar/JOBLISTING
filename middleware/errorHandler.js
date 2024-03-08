const errorHandling=(error,req,res,next)=>{
        console.log(`[ERROR]::${error}`);
        res.status(500).json({errormessage:"Internal Server Error"});
};
module.exports=errorHandling;