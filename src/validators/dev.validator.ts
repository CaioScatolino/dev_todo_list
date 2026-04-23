import { z } from "zod";

export const createDevSchema = z.object({
    nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    inicio_turno: z.string().refine((time) => /^\d{2}:\d{2}(:\d{2})?$/.test(time), "Formato de hora inválido"),
    fim_turno: z.string().refine((time) => /^\d{2}:\d{2}(:\d{2})?$/.test(time), "Formato de hora inválido"),
});