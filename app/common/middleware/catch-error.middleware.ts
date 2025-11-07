import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import asynchandler from "express-async-handler"
export const catchError =  asynchandler((req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createHttpError(400, {
      message: "Validation error",
      data: errors.array(),
    });
  }
  next();
}
);
