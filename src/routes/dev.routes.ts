import { Router } from "express";
import * as devController from "../controllers/dev.controller";


const router = Router();

router.post("/", devController.createDev);
router.get("/", devController.getAllDevs);


export default router;