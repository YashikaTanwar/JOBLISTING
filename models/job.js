const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    CompanyName:{
        type:String,
        required:true,
    },
    Title:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    LogoUrl:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("job",jobSchema);