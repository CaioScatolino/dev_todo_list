import { z } from "zod";

export const createAtendimentoSchema = z.object({
  dev_id: z.number(),
  tipo: z.enum(["suporte", "desenvolvimento"]),
});

export const stopAtendimentoSchema = z.object({
  id: z.number(),
});
