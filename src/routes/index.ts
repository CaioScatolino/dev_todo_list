import { Router, Request, Response } from "express";
import devRoutes from "./dev.routes";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: true });
});

router.use("/devs", devRoutes);

export default router;
