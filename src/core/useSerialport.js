const { SerialPort } = require('serialport')

let UniqueInstance, Port1, Port2, Win = undefined
module.exports = class UseSerialPort {

    selfLog(id, label, msg) {
        // evt.reply('óia só')
        const msgLog = `${label} -> ${msg}\n`
        // win.webContents.send('on:port', myLogs1)
        if (id === "port-1-logs") {
            // myLogs1 += msgLog
            this.win?.webContents.send('on:port', msgLog)
            //   document.getElementById(id).value = myLogs1
            //   appendFile(pathLogs1, myLogs1)
            // console.log(myLogs2)
        }

        if (id === "port-2-logs") {
            // myLogs2 += msgLog
            this.win?.webContents.send('on:port', msgLog)
            //   document.getElementById(id).value = myLogs2
            //   appendFile(pathLogs2, myLogs2)
            // console.log(myLogs2)
        }

        // appendFile(txtPath, msgLog)
        console.log(msgLog)

    }

    async disconnect(win) {
        if (Port1?.isOpen) {
            console.log('disconnect');
            await Port1.close()
            win.webContents.send('on:port', { key: "close:port1", data: "porta 1 encerrada" })
            Port1 = undefined
        }

        if (Port2?.isOpen) {
            await Port2.close()
            console.log('disconnect');
            win.webContents.send('on:port', { key: "close:port2", data: "porta 2 encerrada" })
            Port2 = undefined
        }
    }

    portError(key, win, port) {
        port.on('error', function (err) {
            console.log('Error: ', err.message)
            win.webContents.send('on:port', { key, data: err.message })
        })
    }

    portReadable(win, port, receiver) {
        port.on('readable', function () {
            const read = port.read().toString()
            // selfLog("port-1-logs", port1, read)
            win.webContents.send('on:port', { key: "msg:port1", data: read })
            if (receiver.isOpen)
                receiver.write(read)
        })
    }

    on(win, port1, port2) {
        this.portError("erro:port1", win, port1)
        this.portError("erro:port2", win, port2)
        this.portReadable(win, port1, port2)
    }

    async connect(win) {
        Win = win

        const port1 = Port1 || new SerialPort({
            path: "COM10",
            baudRate: 9600,
        })

        Port1 = port1

        const port2 = Port2 || new SerialPort({
            path: "COM12",
            baudRate: 9600,
        })
        Port2 = port2

        // const selfLog = this.selfLog

        console.info(`Porta_1:${port1.path} | Porta_2:${port2.path} | Taxa:${port1.baudRate}`);

        this.on(win, port1, port2)
        // console.log(await SerialPort.list());
    }

    static makeUnique() {
        if (!UniqueInstance)
            UniqueInstance = new UseSerialPort()
        return UniqueInstance
    }
}




