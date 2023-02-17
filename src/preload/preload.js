const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('setup', {
    get: () => ipcRenderer.invoke('get-setup'),
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