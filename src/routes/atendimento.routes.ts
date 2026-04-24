import { Router } from "express";
import * as atendimentoController from "../controllers/atendimento.controller";

const router = Router();

router.post("/", atendimentoController.createAtendimento);
router.get("/", atendimentoController.getAllAtendimentos);
router.patch("/stop/:id", atendimentoController.stopAtendimento);

export default router;