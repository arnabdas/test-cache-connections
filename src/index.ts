import redisCache from "./caches/redis.cache";
import "dotenv/config";

console.log("REDIS_HOST => ", process.env.REDIS_HOST);
console.log("REDIS_CLUSTER_HOST => ", process.env.REDIS_CLUSTER_HOST);

(async () => {
  try {
    await redisCache.save("my-key", "Hello, Redis!", 60);
    const data = await redisCache.fetch<string>("my-key");
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    await redisCache.reset();
    await redisCache.close();

    process.exit(0);
  }
})();
