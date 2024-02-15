const { exec } = require('child_process');

function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        console.log(stdout);

        if (stderr) {
            console.error(`Error: ${stderr}`);
        }
    });
}

executeCommand('dir');
executeCommand('echo "Hello, Node.js!"');
