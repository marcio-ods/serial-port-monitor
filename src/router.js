const { app, ipcMain } = require('electron');
const UseSerialPort = require('./core/useSerialport');
const getConfigs = require('./utils/getConfigs');
let SerialPort

function connect() {
    UseSerialPort.makeUnique().connect()
}

module.exports = function route(win) {
    ipcMain.handle('router', (evt, data) => {
        console.log(data.key);
        switch (data.key) {
            case "get/setup": return getConfigs()
            case "open-txt-msg": return console.log('open-txt-msg');
            case "open-txt-port-1": return console.log('open-txt-port-1');
            case "open-txt-port-2": return console.log('open-txt-port-2');
            default:
                break;
        }
    })

    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping" in the Node console
        // works like `send`, but returning a message back
        // to the renderer that sent the original message
        event.reply('asynchronous-reply', 'pong')
        let cont = 0
        setInterval(() => {
            win.webContents.send('asynchronous-reply', 'pong' + ++cont)
        }, 1000)
    })

    ipcMain.on('on:port', (event, key) => {
        if (key === "connect")
            UseSerialPort.makeUnique().connect(win)
        if (key === "disconnect")
            UseSerialPort.makeUnique().disconnect(win)
    })
}

