// dotenv is used to load values from .env file
require("dotenv").config();
const express=require('express'); 
const { default: mongoose } = require('mongoose');
const auth=require('./routes/auth');
const job=require('./routes/job');
const app=express();

const host=process.env.HOST || "localhost";
const port=process.env.PORT || 3000;

//app.use() tells the server that these are the routes
app.use('/api/v1/auth',auth);
app.use('/api/v1/job',job);

// type of request which we will receive
app.use(express.json());

// connecting database to express server
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("DB successfully connected");
})
.catch((error)=>{
    console.log(error);
});

app.get("/health",(req,res)=>{
    res.json({
    service:"Job Listing Backend",
    status:"true",
    time: new Date()
    });
})

app.listen(port,()=>{
    console.log(`Backend server running at http://${host}:${port}`)
});