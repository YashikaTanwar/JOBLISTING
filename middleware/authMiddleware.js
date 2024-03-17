// middleware is used for authentication purpose
// used for verifying tokens
const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    try{
        // authorization is a value which is defined under 'Headers' and from there we are fetching/extracting token    
        const token=req.header("Authorization");

        // token <- userID
        // trying to access the system without token
        if(!token)
        {
            // error 401 -> invalid token
            res.status(401).json({message:"Unauthorized access"});
        }
        // for token verification
        const decode=jwt.verify(token[1],process.env.SECRET_KEY);
        
        // whether user is present in DB or not
        const isUserValid=User.findById(decode.userId);
        if(!isUserValid){
            res.status(401).json({message:"Unauthorized Access"});
        }
        next();
    }
    // if token doesn't match then it simply prints error block
    catch(error){
        console.log(error);
        res.status(401).json({message:"Invalid token"});
    }
}
module.exports = verifyToken;