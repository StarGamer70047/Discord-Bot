const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

client.login(config.token);
