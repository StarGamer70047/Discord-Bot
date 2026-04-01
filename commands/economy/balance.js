const { getUser } = require("../../utils/database");

module.exports = {
  name: "balance",
  execute(message) {
    const user = getUser(message.author.id);
    message.reply(`Coins: ${user.coins}`);
  }
};
