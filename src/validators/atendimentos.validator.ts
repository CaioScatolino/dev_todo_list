import { z } from "zod";

export const createAtendimentoSchema = z.object({
  dev_id: z.number(),
  tipo: z.enum(["suporte", "desenvolvimento"]),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  solicitante: z.string().min(1, "Solicitante é obrigatório"),
});

export const stopAtendimentoSchema = z.object({
  id: z.coerce.number(),
});
