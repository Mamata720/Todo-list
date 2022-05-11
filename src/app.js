const console = require('console');
const express=require('express')
const app=express();

const path=require('path');
const { resolve } = require('path/posix');

const port=process.env||8000;

if(process.env.NODE_ENV==="production"){
    app.use(express.static('buld'));
    app.get("*",(req,res)=>{
        req.sendFile(path,resolve(_dirname,'build','index.html'));
    })
}

app.listen(port,(err)=>{
    if(err)return console.log(err);
    console.log("server runing on port ",port)
})