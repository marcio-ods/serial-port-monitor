const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('setup', {
    baudRate: () => 9600,
    port1: () => "COM1",
    port2: () => "COM2",
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // we can also expose variables, not just functions
})

window.addEventListener('DOMContentLoaded', () => {

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})