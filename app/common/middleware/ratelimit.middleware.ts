import rateLimit from "express-rate-limit";


export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,        // 1 minute window
  max: 5,                         // limit each IP to 5 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,          // Return rate limit info in headers
  legacyHeaders: false,
  keyGenerator: (req) => req.ip!, // Use the IP as the unique identifier
});

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,        // 1 minute window
  max: 3,                         // only 5 login attempts per IP per minute
  message: "Too many login attempts from this IP, please try again later.",
  standardHeaders: true,          // Return rate limit info in headers
  legacyHeaders: false,
  keyGenerator: (req) => req.ip!,  // Use the IP as the unique identifier
});