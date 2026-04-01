require("dotenv").config();

module.exports = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX || "!",
  ai: process.env.AI_ENABLED === "true"
};
