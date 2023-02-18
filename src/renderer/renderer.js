// const { SerialPort } = require('serialport')

let
    serialPort,
    inputPort1,
    inputPort2,
    directory,
    baudRate,
    textLogsApp,
    dispPort1,
    dispPort2,
    displayMsg,
    btnOnOff,
    btnOpenPath,
    btnOpenTxtPort1,
    btnOpenTxtPort2,
    btnOpenTxtMsg,
    btnCleanTxtPort1,
    btnCleanTxtPort2,
    btnCleanTxtMsg;


const btnDeleteDisabled = (btn) => {
    btn.classList.remove("btn-primary");
    btn.disabled = true;
}
const btnDeleteActive = (btn) => {
    btn.disabled = false;
    btn.classList.add("btn-primary");
}

window.addEventListener('DOMContentLoaded', async () => {
    // navigator.serial.addEventListener('connect', (e) => {
    //     // Connect to `e.target` or add it to a list of available ports.
    // });

    inputPort1 = document.getElementById('input-port-1')
    inputPort2 = document.getElementById('input-port-2')
    baudRate = document.getElementById('input-baud-rate')
    directory = document.getElementById('input-path')

    // textarea
    textLogsApp = document.getElementById('text-logs-app')
    displayMsg = document.getElementById('disp-text-msg')
    dispPort1 = document.getElementById('disp-text-1')
    dispPort2 = document.getElementById('disp-text-2')
    // textarea

    // buttons    
    btnOpenPath = document.getElementById('btn-open-path')
    btnOnOff = document.getElementById('btn-on-off')
    btnOpenTxtMsg = document.getElementById('btn-open-txt-msg')
    btnOpenTxtPort1 = document.getElementById('btn-open-txt-port-1')
    btnOpenTxtPort2 = document.getElementById('btn-open-txt-port-2')

    btnCleanTxtMsg = document.getElementById('btn-clean-txt-msg')
    btnCleanTxtPort1 = document.getElementById('btn-clean-txt-port-1')
    btnCleanTxtPort2 = document.getElementById('btn-clean-txt-port-2')

    btnDeleteTxtMsg = document.getElementById('btn-delete-txt-msg')
    btnDeleteTxtPort1 = document.getElementById('btn-delete-txt-port-1')
    btnDeleteTxtPort2 = document.getElementById('btn-delete-txt-port-2')
    // buttons


    const setup = await window.api.request({ key: 'get/setup' })

    if (inputPort1) inputPort1.value = setup.port_1
    if (inputPort2) inputPort2.value = setup.port_2
    if (baudRate) baudRate.value = setup.baud_rate
    if (directory) directory.value = setup.directory

    serialPort = await window.api.connect()

    if (btnOnOff) btnOnOff.onclick = async () => {
        if (btnOnOff.value === "on") {
            btnOnOff.value = "off";
            btnOnOff.checked = false;
            serialPort?.send('on:port', { key: 'disconnect' })
        } else {
            btnOnOff.value = "on";
            btnOnOff.checked = true;
            serialPort.send('on:port', {
                key: 'connect', data: {
                    port1: inputPort1.value.trim(),
                    port2: inputPort2.value.trim(),
                    baudRate: baudRate.value.trim()
                }
            })
        }
        // const socket = await window.api.socket({ key: 'get/setup' })

        // btnConnect. 
        // setTimeout(() => {
        //     //     window.api.connect().send('on:port', 'disconnect')

        // }, 1000)
        // socket.send('asynchronous-message', 'ping')
        // console.log(socket);
    }

    // if (btnDisConnect) btnDisConnect.onclick = () => {
    //     serialPort?.send('on:port', 'disconnect')
    // }

    if (btnCleanTxtMsg) btnCleanTxtMsg.onclick = () => displayMsg.value = ""
    if (btnCleanTxtPort1) btnCleanTxtPort1.onclick = () => dispPort1.value = ""
    if (btnCleanTxtPort2) btnCleanTxtPort2.onclick = () => dispPort2.value = ""

    if (btnOpenPath) btnOpenPath.onclick = async () => window.api.request({ key: 'open-path' })
    if (btnOpenTxtMsg) btnOpenTxtMsg.onclick = () => window.api.request({ key: 'open-txt-msg' })
    if (btnOpenTxtPort1) btnOpenTxtPort1.onclick = () => window.api.request({ key: 'open-txt-port-1' })
    if (btnOpenTxtPort2) btnOpenTxtPort2.onclick = () => window.api.request({ key: 'open-txt-port-2' })

    if (btnOpenTxtMsg) btnOpenTxtMsg.onclick = () => window.api.request({ key: 'open-txt-msg' })
    if (btnOpenTxtPort1) btnOpenTxtPort1.onclick = () => window.api.request({ key: 'open-txt-port-1' })
    if (btnOpenTxtPort2) btnOpenTxtPort2.onclick = () => window.api.request({ key: 'open-txt-port-2' })


    if (btnDeleteTxtMsg) btnDeleteTxtMsg.onclick = async () => {
        displayMsg.value = ""
        btnDeleteDisabled(btnOpenTxtMsg)
        await window.api.request({ key: 'delete-txt-msg' })
        btnDeleteActive(btnOpenTxtMsg)
    }

    if (btnDeleteTxtPort1) btnDeleteTxtPort1.onclick = async () => {
        dispPort1.value = ""
        btnDeleteDisabled(btnOpenTxtPort1)
        await window.api.request({ key: 'delete-txt-port-1' })
        btnDeleteActive(btnOpenTxtPort1)
    }

    if (btnDeleteTxtPort2) btnDeleteTxtPort2.onclick = async () => {
        dispPort2.value = ""
        btnDeleteDisabled(btnOpenTxtPort2)
        await window.api.request({ key: 'delete-txt-port-2' })
        btnDeleteActive(btnOpenTxtPort2)
    }

    // if (element) element.innerText = text

})

