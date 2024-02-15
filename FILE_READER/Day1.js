const fs = require('fs');

function readFileContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.code}`);
        } else {
            console.log('File Content:');
            console.log(data || '(empty string)');
            console.log('Hello,Node.js!');
        }
    });
}

readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');