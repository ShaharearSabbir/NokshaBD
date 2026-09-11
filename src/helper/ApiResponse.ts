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

  static notFound(res: Response) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Not Found please insert the currect id",
    });
  }
}
