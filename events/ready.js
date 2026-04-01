const deploy = require("../handlers/deployCommands");

module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    await deploy();
  }
};
