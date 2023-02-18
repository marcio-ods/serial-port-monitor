// const { SerialPort } = require('serialport')

let inputPort1,
    inputPort2,
    directory,
    baudRate,
    dispPort1,
    dispPort2,
    displayMsg,
    btnConnect,
    btnDisConnect,
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

    displayMsg = document.getElementById('disp-text-msg')
    dispPort1 = document.getElementById('disp-text-1')
    dispPort2 = document.getElementById('disp-text-2')

    // buttons    
    btnConnect = document.getElementById('btn-connect')
    btnDisConnect = document.getElementById('btn-disconnect')

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
    const socket = await window.api.connect()
    // const socket = await window.api.socket({ key: 'get/setup' })

    socket.send('on:port', 'connect')

    setTimeout(() => {
        socket.send('on:port', 'disconnect')
        //     window.api.connect().send('on:port', 'disconnect')

    }, 1000)
    // socket.send('asynchronous-message', 'ping')
    // console.log(socket);



    if (inputPort1) inputPort1.value = setup.port_1
    if (inputPort2) inputPort2.value = setup.port_2
    if (baudRate) baudRate.value = setup.baud_rate
    if (directory) directory.value = setup.directory

    // displayMsg.value = "oi kkk"
    // dispPort1.value = "oi sadas"
    // dispPort2.value = "oi lll"

    if (btnCleanTxtMsg) btnCleanTxtMsg.onclick = () => displayMsg.value = ""
    if (btnCleanTxtPort1) btnCleanTxtPort1.onclick = () => dispPort1.value = ""
    if (btnCleanTxtPort2) btnCleanTxtPort2.onclick = () => dispPort2.value = ""

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

