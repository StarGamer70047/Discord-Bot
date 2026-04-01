const axios = require("axios");

module.exports = async (msg) => {
  if (process.env.AI_ENABLED !== "true") return null;

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: msg }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch {
    return "AI error";
  }
};
