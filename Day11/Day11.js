const express = require(`express`);
const app=express();
const PORT=3000;


const authenticationMiddleware= require(`./authenticationMiddleware`);


//Routes
app.get('/',(req,res)=>{
    res.send(`Hey users, Day11 of NodeJS Challenge is completed`);
});

//Protected route
app.get('/protected',authenticationMiddleware,(req,res)=>{
    res.send(`You are in the protected area`);
});

//Server
app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});