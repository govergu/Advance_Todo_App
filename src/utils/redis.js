const config = require("../config/index");
const { createClient } = require("redis");

const redis = createClient({
  url: config.redisUrl,
});

redis
  .connect()
  .then(() => console.log("Redis Connected"))
  .catch((err) => console.log("Redis Error:", err));

redis.delPattern = async (pattern) => {
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(keys);
  }
};

module.exports = redis;
