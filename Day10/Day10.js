const express = require(`express`);
const path = require(`path`);

const app = express();
const publicDirectoryPath=path.join(__dirname);

app.use(express.static(publicDirectoryPath));

app.get(`/`,(req,res)=>{
    res.sendFile(path.join(publicDirectoryPath,"index.html"));
});
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});