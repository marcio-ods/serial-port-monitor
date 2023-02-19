const { ipcMain } = require('electron');
const UseSerialPort = require('./core/useSerialport');
const cleanFile = require('./utils/cleanFile');
const getConfigs = require('./utils/getConfigs');
const openPath = require('./utils/openPath');

module.exports = function route(win) {
    ipcMain.handle('router', (evt, { key, data }) => {
        // console.log(key);
        // console.log(data);
        switch (key) {
            case "get/setup": return getConfigs();
            case "clean-file": return cleanFile(data);
            case "open-path": return openPath(data);
            case "open-dev-tools": return win.webContents.openDevTools();
            case "reload-ignoring-cache": return win.webContents.reloadIgnoringCache();
            default:
                break;
        }
    })

    ipcMain.on('on:port', (event, { key, data }) => {
        if (key === "disconnect")
            UseSerialPort.makeUnique().disconnect(win)
        if (key === "connect") {
            UseSerialPort.makeUnique().connect(win, data)
        }
    })
}

