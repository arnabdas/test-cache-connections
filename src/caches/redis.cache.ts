import redis from "../config/redis.config";

export default {
  fetch: async <T>(key: string): Promise<T | null> => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  save: async <T>(key: string, value: T, ttl?: number): Promise<void> => {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await redis.setex(key, ttl, serializedValue);
    } else {
      await redis.set(key, serializedValue);
    }
  },
  delete: async (key: string): Promise<void> => {
    await redis.del(key);
  },
  close: async (): Promise<void> => {
    await redis.quit();
  },
  reset: async (): Promise<void> => {
    await redis.flushdb("ASYNC");
    await redis.flushall("ASYNC");
  },
};
