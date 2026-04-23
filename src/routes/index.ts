import { Router, Request, Response } from "express";
import devRoutes from "./dev.routes";
import atendimentoRoutes from "./atendimento.routes";
const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

router.use("/devs", devRoutes);
router.use("/atendimentos", atendimentoRoutes);
export default router;
