
const { resolve } = require('path');
const { shell } = require('electron');

module.exports = async function openPath(filename) {
    let dir = resolve(__dirname, "..", "..", "..");
    filename = ["data", filename]

    if (dir.endsWith("resources"))
        await shell.openPath(resolve(dir, ...filename.filter(f => f)))
    else
        await shell.openPath(resolve(dir, "serial-port-monitor", ...filename.filter(f => f)));
}


