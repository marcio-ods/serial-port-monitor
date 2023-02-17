const getConfigs = require("../utils/getConfigs")

let state = undefined
module.exports = class State {
    port_1 = ""
    port_2 = ""
    baud_rate = ""
    directory = ""
    constructor() {
        getConfigs().then((data) => {
            this.port_1 = data.port_1
            this.port_2 = data.port_2
            this.baud_rate = data.baud_rate
            this.directory = data.directory
            console.log(data);
        }).catch(() => { console.log("deu ruim") })
    }

    setSetup(data) {
        this.port_1 = data.port_1
        this.port_2 = data.port_2
        this.baud_rate = data.baud_rate
    }

    setPort_2(value) {
        this.port_1 = value
    }
    setPort_1(value) {
        this.port_1 = value
    }
    setPort_1(value) {
        this.baud_rate = value
    }
    static makeUnique() {
        if (!state)
            state = new State()
        return state
    }
}