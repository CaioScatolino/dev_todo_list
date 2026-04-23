import { RequestHandler } from "express";
import { createDevSchema } from "../validators/dev.validator";
import * as devService from "../services/dev.service";

export const createDev: RequestHandler = async (req, res) => {
  console.log("Corpo recebido:", req.body);
  const result = createDevSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  await devService.createDev(result.data);
  res.status(201).json({ message: "Dev criado com sucesso!" });
};

export const getAllDevs: RequestHandler = async (req, res) => {
  const devs = await devService.getAllDevs();
  res.status(200).json(devs);
};

