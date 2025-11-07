"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_services_1 = require("../../services/redis.services");
const cache = (key, ttl = 60) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // ✅ Allow static key or function-generated key
    const finalKey = typeof key === "function" ? key(req) : key;
    const cachedData = yield redis_services_1.redisService.get(finalKey);
    if (cachedData) {
        console.log("✅ Cache Hit:", finalKey);
        return res.json(cachedData); // already parsed
    }
    console.log("❌ Cache Miss:", finalKey);
    const originalJson = res.json.bind(res);
    res.json = (data) => {
        redis_services_1.redisService.set(finalKey, data, ttl);
        return originalJson(data);
    };
    next();
});
exports.cache = cache;
