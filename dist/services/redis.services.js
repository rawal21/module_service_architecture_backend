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
exports.redisService = void 0;
const redis_1 = require("redis");
class RedisService {
    constructor() {
        this.client = (0, redis_1.createClient)();
        this.client.on("error", (err) => {
            console.error("Redis error", err);
        });
        this.client.connect();
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.get(key);
            return data ? JSON.parse(data) : null;
        });
    }
    set(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, ttl = 60) {
            return this.client.set(key, JSON.stringify(value), { EX: ttl });
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.del(key);
        });
    }
}
exports.redisService = new RedisService();
