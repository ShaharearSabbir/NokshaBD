import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export class ApiResponse {
  static success<T>(res: Response, data: T) {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "data retrived successfully",
      ...(data && data),
    });
  }

  static error(res: Response) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "internal server error",
    });
  }

  static badRequest(res: Response) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "bad request",
    });
  }
}
