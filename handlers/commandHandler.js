const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  client.commands = new Map();

  function load(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      if (fs.lstatSync(full).isDirectory()) load(full);
      else {
        const cmd = require(full);
        client.commands.set(cmd.name, cmd);
      }
    }
  }

  load("./commands");
};
