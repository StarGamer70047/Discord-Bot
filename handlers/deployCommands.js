const { REST, Routes } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

module.exports = async () => {
  const commands = [];

  function load(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      if (fs.lstatSync(full).isDirectory()) load(full);
      else {
        const cmd = require(full);
        if (cmd.slash) commands.push(cmd.slash.toJSON());
      }
    }
  }

  load("./commands");

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  );

  console.log("Slash commands deployed");
};
