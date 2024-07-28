const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); 
//const { v4: uuid } = require('uuid');

const outputPath = path.join(__dirname, 'outputs'); // backend\generateFile.js(relative path) D:\CHHOTU OC\backend\generateFile.js(path)

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath , input_filePath) => { // backend\generateFile.js(relative path) D:\CHHOTU OC\backend\generateFile.js(path)
    const jobId = path.basename(filepath).split(".")[0];  //[7aed09ee-3341-4154-9e63-1d2c0738460e , cpp]
    const output_filename = `${jobId}.exe`; //7aed09ee-3341-4154-9e63-1d2c0738460e.exe
    const outPath = path.join(outputPath, output_filename)

    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" &&  "${outPath}" < "${input_filePath}"`;
        exec(command,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error : ${error}`);
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeCpp,
};