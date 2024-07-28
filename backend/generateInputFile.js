const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirInputs = path.join(__dirname, 'inputs'); // backend\generateFile.js(relative path) D:\CHHOTU OC\backend\generateFile.js(path)

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs , { recursive: true});
}

const generateInputFile = async (input) => {
    const jobId = uuid();
    const input_filename = `${jobId}.txt`;
    const input_filePath = path.join(dirInputs , input_filename);
    fs.writeFileSync(input_filePath , input);
    return input_filePath;
    // try{
    //  await fs.promises.writeFile(input_filePath , input ,'utf8');
    //   return input_filePath;
    // } catch(error){
    //     console.error("Error writing the input file:" , error);
    //     throw new Error('Failed to generate the input file');
    // }
     
};

module.exports = {
    generateInputFile,
};