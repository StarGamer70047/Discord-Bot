const map = new Map();

module.exports = (id, cmd, time) => {
  if (!map.has(cmd)) map.set(cmd, new Map());
  const now = Date.now();
  const timestamps = map.get(cmd);

  if (timestamps.has(id)) {
    const exp = timestamps.get(id) + time;
    if (now < exp) return (exp - now) / 1000;
  }

  timestamps.set(id, now);
  return 0;
};
