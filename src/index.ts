import * as readline from "readline";
import redisCache from "./caches/redis.cache";
import "dotenv/config";

console.log("REDIS_HOST => ", process.env.REDIS_HOST);
console.log("REDIS_CLUSTER_HOST => ", process.env.REDIS_CLUSTER_HOST);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  try {
    while (true) {
      const input = await new Promise<string>((resolve) => {
        rl.question("Enter a number (9 to exit): ", resolve);
      });

      const choice = parseInt(input);

      if (isNaN(choice)) {
        console.log("Please enter a valid number.");
        continue;
      }

      switch (choice) {
        case 1:
          const previousData = await redisCache.fetch<string>("my-key");
          console.log(`\npreviousData: `, previousData);
          break;
        case 2:
          await redisCache.save("my-key", "Hello, Redis!", 60);
          break;
        case 4:
          console.log("Resetting cache...");
          await redisCache.reset();
          break;
        case 5:
          console.log("Deleting user profile cache...");
          await redisCache.delete(`user_profile:46`);
          // for (let id = 1; id <= 768; id++)
          //   await redisCache.delete(`user_profile:${id}`);
          break;
        case 9:
          await redisCache.close();
          return;
        default:
          console.log("Invalid option. Please try again.");
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
