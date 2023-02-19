module.exports = async function devtools(win) {
    if (!win.webContents.isDevToolsOpened())
        return await win.webContents.openDevTools()
    return await win.webContents.closeDevTools()
}

