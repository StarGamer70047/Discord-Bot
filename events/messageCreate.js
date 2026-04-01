const config = require("../config/config");
const cooldown = require("../utils/cooldown");
const { getUser, updateUser } = require("../utils/database");
const { checkBadWords } = require("../utils/moderation");
const ai = require("../utils/ai");

const spam = new Map();

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;

    if (checkBadWords(message.content)) {
      message.delete().catch(() => {});
      return message.channel.send("Bad language 🚫");
    }

    const now = Date.now();
    const msgs = spam.get(message.author.id) || [];
    msgs.push(now);

    const filtered = msgs.filter(t => now - t < 5000);
    spam.set(message.author.id, filtered);

    if (filtered.length > 5) {
      message.delete().catch(() => {});
      return message.channel.send("Stop spam 🚫");
    }

    let user = getUser(message.author.id);
    user.xp += 10;

    if (user.xp >= user.level * 100) {
      user.level++;
      user.xp = 0;
      message.channel.send(`Level ${user.level}`);
    }

    updateUser(message.author.id, user);

    if (!message.content.startsWith(config.prefix)) {
      if (message.mentions.has(client.user)) {
        const res = await ai(message.content);
        if (res) message.reply(res);
      }
      return;
    }

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    if (!command) return;

    const cd = cooldown(message.author.id, cmd, 3000);
    if (cd > 0) return message.reply(`Wait ${cd.toFixed(1)}s`);

    command.execute(message, args, client);
  }
};
