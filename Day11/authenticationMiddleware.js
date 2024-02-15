const jwt = require(`jsonwebtoken`);
const your_secret_key = 'your-secret'; 

function authenticationMiddleware (req,res,next){
    const token =req.headers[`authorization`];
     if(!token) {
        return res.status(401).send(`No token provided.`);
}
jwt.verify(token,your-secret,(err,decoded)=>{
   if (err) {
    return res.status(500).send(`Failed to aunthenticate.`);
}
   req.user = decoded;
   console.log( `User authenticate:`,decoded);
   next();
   });
}
module.exports=authenticationMiddleware;
