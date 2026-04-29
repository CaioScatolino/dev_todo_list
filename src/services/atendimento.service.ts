import { eq, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { atendimentos, NewAtendimento } from "../db/schema";

const agora = new Date();

export const createAtendimento = async (atendimento: NewAtendimento) => {
  await db.insert(atendimentos).values({
    ...atendimento,
    inicio: sql`now()`,
    modificado_em: sql`now()`,
  });
};

export const getAllAtendimentos = async () => {
  return await db.select().from(atendimentos);
};

export const stopAtendimento = async (id: number) => {
  const result = await db
    .select()
    .from(atendimentos)
    .where(eq(atendimentos.id, id));

  if (result.length === 0) {
    throw new Error("Atendimento não encontrado!");
  }

  await db
    .update(atendimentos)
    .set({
      ativo: false,
      fim: sql`now()`,
      modificado_em: sql`now()`,
      // TIMESTAMPDIFF retorna a diferença em segundos (SECOND)
      // Dividimos por 3600 para ter o valor em horas
      tempo_total_horas: sql`ROUND(TIMESTAMPDIFF(SECOND, ${atendimentos.inicio}, now()) / 3600, 2)`,
    })
    .where(eq(atendimentos.id, id));
};
