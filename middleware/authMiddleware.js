// used for verifying tokens
const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    try{
        // authorization is a value which is defined under 'Headers' and from there we are fetching token value   
        const token=req.header("Authorization");

        // token <- userID
        // this block checks if token exists if not then an error will be generated
        if(!token)
        {
            res.status(401).json({message:"Unauthorized access"});
        }
        // for token verification
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