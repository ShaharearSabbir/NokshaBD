import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse.js";
import { services } from "./service.js";

const getDivisions = async (req: Request, res: Response) => {
  const division = await services.getDivision();

  if (!division) {
    return ApiResponse.error(res);
  }

  ApiResponse.success(res, division);
};

const getDistrict = async (req: Request, res: Response) => {
  const divisionId = req.params.id as string;
  const district = await services.getDistrict(divisionId);

  if (!district) {
    return ApiResponse.notFound(res);
  }

  ApiResponse.success(res, district);
};

const getUpazila = async (req: Request, res: Response) => {
  const districtId = req.params.id as string;
  const upazila = await services.getUpazila(districtId);

  if (!upazila) {
    return ApiResponse.notFound(res);
  }

  ApiResponse.success(res, upazila);
};

const getUnion = async (req: Request, res: Response) => {
  const upazilaId = req.params.id as string;
  const union = await services.getUnion(upazilaId);

  if (!union) {
    return ApiResponse.notFound(res);
  }

  ApiResponse.success(res, union);
};

export const controller = {
  getDivisions,
  getDistrict,
  getUpazila,
  getUnion,
};
