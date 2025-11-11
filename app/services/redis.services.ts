import { createClient } from "redis";

class RedisService {
  private client;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });

    this.client.connect();
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl: number = 60) {
    return this.client.set(key, JSON.stringify(value), { EX: ttl });
  }

  async del(key: string) {
    return this.client.del(key);
  }
}

export const redisService = new RedisService();
