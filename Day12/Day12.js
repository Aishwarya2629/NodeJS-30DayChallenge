const express = require(`express`);
const app = express();
const rateLimit=require(`express-rate-limit`);
const limiter=rateLimit({windowMs:15*60*1000, max:3, message:`Too many requests from this IP, please try again later.`}); // 15

app.use(limiter);
app.get(`/`,(req,res)=>{
    res.send(`Day 12 Completed`);
});

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});

