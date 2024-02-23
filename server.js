require("dotenv").config();
const express=require('express');
const { default: mongoose } = require('mongoose');
const auth=require('./routes/auth')
const app=express();

const host=process.env.HOST || "localhost";
const port=process.env.PORT || 3000;

//app.use() tells the server that these are the routes
app.use('/api/v1/auth',auth)

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
    res.json({serice:"Job Listing Backend",
    active:true,
    time: new Date()
    });
})

app.listen(port,()=>{
    console.log(`Backend server running at http://${host}:${port}`)
});