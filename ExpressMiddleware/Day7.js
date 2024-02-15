/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

function requestLoggerMiddleware(req,res,next){
    const timestamp=new Date().toLocaleString();
    const method=req.method;
    console.log(`${timestamp}-${method} request received.`);
    next();
}

const express = require(`express`);
const app=express();

app.use(requestLoggerMiddleware);
app.get('/',(req,res)=>{
    res.send(`Hello, World`);
});

const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost: ${port}`);
});