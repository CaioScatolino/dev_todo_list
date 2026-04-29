import { RequestHandler } from "express";
import * as dashboardService from "../services/dashboard.service";

export const dashboardTempoPorDev: RequestHandler = async (req, res) => {
  const result = await dashboardService.dashboardTempoPorDevService();
  res.status(200).json(result);
};
