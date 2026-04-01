const axios = require("axios");

module.exports = {
  name: "meme",
  async execute(message) {
    const res = await axios.get("https://meme-api.com/gimme");
    message.channel.send(res.data.url);
  }
};
