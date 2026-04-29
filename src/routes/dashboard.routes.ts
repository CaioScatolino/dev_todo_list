import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/", dashboardController.dashboardTempoPorDev);

export default router;