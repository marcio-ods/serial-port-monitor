const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const makeData = require('./utils/makeData')
// const setup = require('./state/state').makeUnique()
// const getConfigs = require("./utils/getConfigs")
const router = require('./router')
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 850,
        minHeight: 615,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'preload.js')
        }
    })

    // ipcMain.handle('ping', () => 'pong')
    router()

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()
    makeData()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// ipcMain.handle('get-setup', async () => {
//     const setup = await getConfigs()
//     console.log(setup);
//     return {
//         baudRate: setup.baud_rate,
//         port1: setup.port_1,
//         port2: setup.port_2,
//         directory: setup.directory,
//         // we can also expose variables, not just functions
//     }
// })