// https://dev.to/taw/electron-adventures-episode-13-svelte-1m13
const { app, BrowserWindow } = require('electron')
const path = require('path')
const makeData = require('./utils/makeData')
const router = require('./router')
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 870,
        minHeight: 670,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload', 'preload.js')
        }
    })
    // ipcMain.handle('ping', () => 'pong')
    router(win)
    // win.webContents.isDevToolsOpened
    // beforeInputEvent(win)
//     win.webContents.on("before-input-event", (event, input) => { 
//         if(input.key==="F5" && input.type ==="keyUp")
//          console.log(input);
//    });

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


// const electron = require("electron");
 
// // Importing BrowserWindow from Main Process
// // using Electron remote
// const BrowserWindow = electron.remote.BrowserWindow;
// const win = BrowserWindow.getFocusedWindow();
 
// // let win = BrowserWindow.getAllWindows()[0];
 
// win.webContents.on("before-input-event", (event, input) => {
//     console.log(input);
// });