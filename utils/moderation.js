const badWords = ["mc", "bc"];

function checkBadWords(msg) {
  return badWords.some(w => msg.toLowerCase().includes(w));
}

module.exports = { checkBadWords };
