const { writeFile } = require('fs/promises');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');

module.exports = async function setConfigs(data) {
    let dir = resolve(__dirname, "..", "..", "..");
    if (!dir.endsWith("resources"))
        dir = resolve(dir, "serial-port-monitor");
    dir = resolve(dir, "data");

    if (!existsSync(dir))
        mkdirSync(dir);

    const config = resolve(dir, "config.json")
    await writeFile(config, JSON.stringify({
        port_1: data.port1,
        port_2: data.port2,
        baud_rate: data.baudRate,
        directory: dir
    }), { encoding: "utf-8", flag: "w+" })
}

