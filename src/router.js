const { app, ipcMain } = require('electron');
const getConfigs = require('./utils/getConfigs');


module.exports = function route() {
    ipcMain.handle('router', (evt, data) => {
        console.log(data.key);
        switch (data.key) {
            case "setup": return getConfigs()
            case "open-txt-msg": return console.log('open-txt-msg');
            case "open-txt-port-1": return console.log('open-txt-port-1');
            case "open-txt-port-2": return console.log('open-txt-port-2');
            default:
                break;
        }

    })
}

