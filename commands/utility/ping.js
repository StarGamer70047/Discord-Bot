const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  slash: new SlashCommandBuilder().setName("ping").setDescription("Ping"),
  execute(ctx) {
    if (ctx.reply) return ctx.reply("Pong");
    ctx.channel.send("Pong");
  }
};
