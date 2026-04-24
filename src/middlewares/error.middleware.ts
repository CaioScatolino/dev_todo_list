import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/apperror";
import { ZodError } from "zod";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message, data: null });
    return;
  }

  if (error instanceof ZodError) {
    const errorMessage = error.issues.map((issue) => issue.message).join(", ");
    res.status(400).json({ error: errorMessage, data: null });
    return;
  }

  res.status(500).json({ error: "Erro interno do servidor", data: null });
};
