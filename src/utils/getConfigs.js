const { existsSync } = require('fs');
const { readFile } = require('fs/promises');
const { resolve } = require('path');

module.exports = async function getConfigs() {
    let dir = resolve(__dirname, "..", "..", "..");
    if (!dir.endsWith("resources"))
        dir = resolve(dir, "serial-port-monitor");
    const configPath = resolve(dir, "data", "config.json");
    let resp = {
        port_1: "",
        port_2: "",
        baud_rate: "",
        directory: "",
    }
    if (!existsSync(configPath))
        resp = await readFile(configPath, { encoding: "utf8" })
    return resp
}

