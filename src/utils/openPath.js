
const { resolve } = require('path');
const { shell } = require('electron');

module.exports = async function openPath() {
    let dir = resolve(__dirname, "..", "..", "..");
    if (dir.endsWith("resources"))
        await shell.openPath(resolve(dir, "data",));
    else
        await shell.openPath(resolve(dir, "serial-port-monitor", "data",));
}


