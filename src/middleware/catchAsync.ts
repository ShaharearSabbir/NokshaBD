import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse.js";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      ApiResponse.error(res);
    }
  };
};
