const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../data/database.json");

function load() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ users: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(file));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getUser(id) {
  const db = load();
  if (!db.users[id]) {
    db.users[id] = { coins: 0, xp: 0, level: 1 };
    save(db);
  }
  return db.users[id];
}

function updateUser(id, data) {
  const db = load();
  db.users[id] = data;
  save(db);
}

module.exports = { getUser, updateUser };
