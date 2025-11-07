import { Request, Response, NextFunction } from "express";
import { redisService } from "../../services/redis.services";

type CacheKey = string | ((req: Request) => string);

export const cache =
  (key: CacheKey, ttl = 60) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // ✅ Allow static key or function-generated key
    const finalKey = typeof key === "function" ? key(req) : key;

    const cachedData = await redisService.get(finalKey);

    if (cachedData) {
      console.log("✅ Cache Hit:", finalKey);
      return res.json(cachedData); // already parsed
    }

    console.log("❌ Cache Miss:", finalKey);

    const originalJson = res.json.bind(res);

    res.json = (data: any) => {
      redisService.set(finalKey, data, ttl);
      return originalJson(data);
    };

    next();
  };
