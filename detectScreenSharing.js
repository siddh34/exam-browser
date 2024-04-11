// const { exec } = require('child_process');
// const os = require('os');


// async function isScreenSharingSoftwareDetected() {
//     console.log("----isScreenSharingSoftwareDetected");
//     // Check for known processes associated with screen sharing software
//     const screenSharingProcesses = ['AnyDesk', 'TeamViewer', 'zoom', 'Code.exe', 'Code'];
//     const platform = os.platform();
//     if (platform === 'win32') {
//         const command = 'tasklist /fo csv /nh';
//         exec(command, (error, stdout, stderr) => {

//             if (error) {
//                 console.error('Error executing command:', error);
//                 return false;
//             }
//             const processes = stdout.split(/\r?\n/);
//             for (const process of processes) {
//                 // const [name] = process.split('","');
//                 const [name] = process.split('","').map(str => str.replace(/^"|"$/g, ''));
//                 console.log("stdout name---" + name);
//                 if (screenSharingProcesses.includes(name)) {
//                     return true;
//                 }
//             }
//             return false;
//         });
//     } else if (platform === 'darwin') {
//         const command = 'ps -A -o comm=';
//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error('Error executing command:', error);
//                 return false;
//             }
//             const processes = stdout.split('\n');
//             for (const process of processes) {
//                 if (screenSharingProcesses.includes(process.trim())) {
//                     return true;
//                 }
//             }
//             return false;
//         });
//     } else {
//         console.error('Unsupported platform:', platform);
//         return false;
//     }


//     return false;
// }
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require('os');

async function isScreenSharingSoftwareDetected() {
    console.log("----isScreenSharingSoftwareDetected");
    // Check for known processes associated with screen sharing software
    const screenSharingProcesses = ['AnyDesk', 'TeamViewer', 'zoom', 'Code.exe', 'Code'];
    const platform = os.platform();
    if (platform === 'win32') {
        const command = 'tasklist /fo csv /nh';
        try {
            const { stdout } = await exec(command);
            const processes = stdout.split(/\r?\n/);
            for (const process of processes) {
                const [name] = process.split('","').map(str => str.replace(/^"|"$/g, ''));
                // console.log("stdout name---" + name);
                if (screenSharingProcesses.includes(name)) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error executing command:', error);
            return false;
        }
    } else if (platform === 'darwin') {
        const command = 'ps -A -o comm=';
        try {
            const { stdout } = await exec(command);
            const processes = stdout.split('\n');
            for (const process of processes) {
                if (screenSharingProcesses.includes(process.trim())) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error executing command:', error);
            return false;
        }
    } else {
        console.error('Unsupported platform:', platform);
        return false;
    }
}



module.exports = { isScreenSharingSoftwareDetected };