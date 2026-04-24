import { RequestHandler } from "express";
import { createAtendimentoSchema, stopAtendimentoSchema } from "../validators/atendimentos.validator";
import * as atendimentoService from "../services/atendimento.service";
import { AppError } from "../utils/apperror";

export const createAtendimento: RequestHandler = async (req, res) => {
  console.log(req.body);
  const result = createAtendimentoSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Bad Request, validação falhou", 400)
  }
  await atendimentoService.createAtendimento(result.data);
  return res.status(201).json({ message: "Atendimento criado com sucesso!" });
};

export const getAllAtendimentos: RequestHandler = async (req, res) => {
  const atendimentos = await atendimentoService.getAllAtendimentos();
  res.status(200).json(atendimentos);
};

export const stopAtendimento: RequestHandler = async (req, res) => {
  const result = stopAtendimentoSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Bad Request, validação falhou", 400)
  }
  await atendimentoService.stopAtendimento(result.data.id);
  res.status(200).json({ message: "Atendimento parado com sucesso!" });
};