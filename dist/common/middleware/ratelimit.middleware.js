"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginLimiter = exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per window
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    keyGenerator: (req) => req.ip, // Use the IP as the unique identifier
});
exports.loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 3, // only 5 login attempts per IP per minute
    message: "Too many login attempts from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,
    keyGenerator: (req) => req.ip, // Use the IP as the unique identifier
});
