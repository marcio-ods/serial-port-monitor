const { contextBridge, ipcRenderer } = require('electron')
let displayMsg

function setDisplay(value) {
    if (displayMsg) {
        const msg = displayMsg.value + value
        displayMsg.value = msg
    }
}

contextBridge.exposeInMainWorld('api', {
    request: (payload) => ipcRenderer.invoke('router', payload),
    connect: () => ipcRenderer.on('on:port', (_event, args) => {
        // console.log(arg)
        const { key, data } = args
        if (key === "erro:port1") {
            // setLabel Port1 vermelho
            console.log("erro:port1", data)
        }
        if (key === "erro:port2") {
            // setLabel Port2 vermelho
            console.log("erro:port2", data)
        }
        if (key === "close:port1" || key === "close:port2") {
            // setLabel Port2 vermelho
            console.log("erro:port2", data)
        }

        setDisplay(data)
        // setDisplay(arg)
        // console.log(displayMsg) // prints "pong" in the DevTools console
        // console.log(arg) // prints "pong" in the DevTools console
    })

})

// if (inputPort1) inputPort1.value = setup.port_1
// if (inputPort2) inputPort2.value = setup.port_2
// if (baudRate) baudRate.value = setup.baud_rate
// if (directory) directory.value = setup.directory


window.addEventListener('DOMContentLoaded', () => {
    displayMsg = document.getElementById('disp-text-msg')
    // const serialPort = new SerialPort()
    // const serialPort = require('serialport')
    // console.log(serialPort)
    //     require('serialport/package')
    // for (const versionType of['chrome', 'electron', 'node']) {
    //     document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    // }

    // document.getElementById('serialport-version').innerText = require('serialport/package').version


})