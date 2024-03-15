// Importing mongoose library
const mongoose=require('mongoose');

//DB schema creation 
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
    },
    Salary:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    Duration:{
        type:String,
        required:true,
    },
    LocationType:{
        type:String,
        required:true,
    },
},
    {timestamps:{createdAt:"createdAt",updatedAt:"updatedAt"}},
)
// mongoose.model("model name","schema name") 
module.exports=mongoose.model("job",jobSchema);