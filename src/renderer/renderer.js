// console.log($.);

// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const inputPort1 = document.getElementById('input-port-1')
inputPort1.value = setup.port1()
const inputPort2 = document.getElementById('input-port-2')
inputPort2.value = setup.port2()
const baudRate = document.getElementById('input-baud-rate')
baudRate.value = setup.baudRate()


const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()