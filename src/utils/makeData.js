const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');

module.exports = function makeData() {
    let dir = resolve(__dirname, "..", "..", "..");
    if (!dir.endsWith("resources"))
        dir = resolve(dir, "serial-port-monitor");
    dir = resolve(dir, "data");

    console.log(dir);
    if (!existsSync(dir))
        mkdirSync(dir);

    const config = resolve(dir, "config.json")
    if (!existsSync(config))
        writeFileSync(config, JSON.stringify({
            port_1: "",
            port_2: "",
            baud_rate: "",
        }), { encoding: "utf-8", flag: "w+" })

    for (const it of ["log_port_1.txt", "log_port_2.txt", "log_msg.txt"]) {
        const file = resolve(dir, it)
        if (!existsSync(file))
            writeFileSync(file, '', { encoding: "utf-8", flag: "w+" })
    }
}

