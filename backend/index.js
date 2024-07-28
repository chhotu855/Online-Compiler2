const express = require('express');
const cors = require("cors");
const {generateFile} = require("./generateFile");
const {generateInputFile} = require("./generateInputFile");
const {executeCpp} = require('./executeCpp');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get("/" ,(req, res) => {
    res.send({online: 'compiler-cpp'});
});

app.post("/run" ,async(req,res) => {
    const {language = 'cpp' , code , input} = req.body;
    
    if(code === undefined){
        return res.status(400).json({"success": false , message: "empty code body!"});
    }

    try {
       const filePath = await generateFile(language , code);
       const input_filePath = await generateInputFile(input);
       const output = await executeCpp(filePath , input_filePath);
       res.json({filePath ,input_filePath, output});
    } catch(error) {
        console.log(error);
        res.status(500).json({"success": false , message: error.message});
    }
    
});
app.listen(8001 , () => {
    console.log("server is listening on port 8001");
});