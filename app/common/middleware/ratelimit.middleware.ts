import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import type { Request, Response } from "express";

// Generic rate limiter (for general APIs)
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,                  // limit each IP to 5 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,   // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,    // Disable the old `X-RateLimit-*` headers
  keyGenerator: (req: Request, res: Response): string => ipKeyGenerator(req as any, res as any) as string, // IPv6 safe
});

// Login-specific rate limiter (more strict)
export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3,                  // limit each IP to 3 login attempts per window
  message: "Too many login attempts from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request, res: Response): string => ipKeyGenerator(req as any , res as any) as string , // IPv6 safe
});
