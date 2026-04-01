const { getUser, updateUser } = require("../../utils/database");

module.exports = {
  name: "daily",
  execute(message) {
    const user = getUser(message.author.id);
    user.coins += 50;
    updateUser(message.author.id, user);
    message.reply("+50 coins");
  }
};
