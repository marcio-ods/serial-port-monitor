const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('bridge', {
    request: (payload) => ipcRenderer.invoke('router', payload)
})

// if (inputPort1) inputPort1.value = setup.port_1
// if (inputPort2) inputPort2.value = setup.port_2
// if (baudRate) baudRate.value = setup.baud_rate
// if (directory) directory.value = setup.directory



function LOG(id, label, msg) {
    const msgLog = `${label} -> ${msg}\n`

    // if (id === "port-1-logs") {
    //     myLogs1 += msgLog
    //     document.getElementById(id).value = myLogs1
    //     appendFile(pathLogs1, myLogs1)
    //     console.log(myLogs2)
    // }

    // if (id === "port-2-logs") {
    //     myLogs2 += msgLog
    //     document.getElementById(id).value = myLogs2
    //     appendFile(pathLogs2, myLogs2)
    //     console.log(myLogs2)
    // }

    // appendFile(txtPath, msgLog)
    console.log(msgLog)
}

// window.addEventListener('DOMContentLoaded', () => {
//     require('serialport/package')
    // for (const versionType of['chrome', 'electron', 'node']) {
    //     document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    // }

    // document.getElementById('serialport-version').innerText = require('serialport/package').version


// })