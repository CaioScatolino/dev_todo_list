import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    res.json({ message: "Dev criado com sucesso!" });
}); 

export default router;