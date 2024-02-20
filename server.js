const express=require('express');
const app=express();

const host=process.env.HOST || "localhost";
const port=process.env.PORT || 3000;

app.get("/health",(req,res)=>{
    res.json({serice:"Job Listing Backend",
    active:true,
    time: new Date()
    });
})

app.listen(port,()=>{
    console.log(`Backend server running at http://${host}:${port}`)
})