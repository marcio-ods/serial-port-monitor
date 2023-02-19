// const UseSerialPort = require("../core/useSerialport");

module.exports = function beforeInputEvent(win) {
    win.webContents.on("before-input-event", (event, input) => {
        // if (input.key === "F5" && input.type === "keyUp") {
        //     if (UseSerialPort.isConnected()){

        //     }
        //     const on = UseSerialPort.makeUnique()

        // }
        console.log(input);
    });

}