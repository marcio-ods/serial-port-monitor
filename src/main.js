const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const makeData = require('./utils/makeData')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 845,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'preload.js')
        }
    })

    ipcMain.handle('ping', () => 'pong')
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
