import { Router } from "express";
import { controller } from "./controller.js";
import { catchAsync } from "../middleware/catchAsync.js";

export const route: Router = Router();

route.get("/divisions", catchAsync(controller.getDivisions));
route.get("/districts/:id", catchAsync(controller.getDistrict));
route.get("/upazilas/:id", catchAsync(controller.getUpazila));
route.get("/unions/:id", catchAsync(controller.getUnion));
