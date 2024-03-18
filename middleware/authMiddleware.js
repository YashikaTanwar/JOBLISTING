// middleware is used for authentication purpose
// used for verifying tokens
const jwt=require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    try{
        // authorization is a value which is defined under 'Headers' and from there we are fetching/extracting token    
        const token=req.header("Authorization").split(" ");

        // token <- userID
        // trying to access the system without token
        if(!token && token.length<2)
        {
            // error 401 -> invalid token
            res.status(401).json({message:"Unauthorized access"});
        }
        // for token verification
        // if token does not match it will generate an error instead of returning null value
        // just like other blocks which were returning an error it does not do the same instead return catch block 
        const decode=jwt.verify(token[1],process.env.SECRET_KEY);
        
        // whether user is present in DB or not
        // const isUserValid=User.findById(decode.userId);
        // if(!isUserValid){
        //     res.status(401).json({message:"Unauthorized Access"});
        // }
        next();
    }
    // if token doesn't match then it simply prints error block
    // if error-> jwt malformed - it means invalid token
    catch(error){
        console.log(error);
        // this error will get printed on front-end
        res.status(401).json({message:"Invalid token"});
    }
}
module.exports = verifyToken;