const { writeFile, rem } = require('fs/promises');
const { resolve } = require('path');

module.exports = async function cleanFile(filename) {
    try {
        let dir = resolve(__dirname, "..", "..", "..");
        if (dir.endsWith("resources"))
            await writeFile(resolve(dir, "data", filename), '', { encoding: "utf-8", flag: "w+" })
        await writeFile(resolve(dir, "serial-port-monitor", "data", filename), '', { encoding: "utf-8", flag: "w+" })
    } catch (error) {
        console.log(error.message);

    }
}

