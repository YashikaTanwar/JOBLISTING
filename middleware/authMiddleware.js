const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    try{
        const token=req.header("Authorization");
        // token <- userID
        if(!token)
        {
            res.status(401).json({message:"Unauthorized access"});
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    // if token doesn't match then it simply prints error block
    catch(error){
        console.log(error);
        res.status(401).json({message:"Invalid token"});
    }
}
module.exports = verifyToken;