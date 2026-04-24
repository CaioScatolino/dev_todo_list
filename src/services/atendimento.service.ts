import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { atendimentos, NewAtendimento } from "../db/schema";

export const createAtendimento = async (atendimento: NewAtendimento) => {
  const agora = new Date();
  const agoraLocal = new Date(agora.getTime() - (3 * 60 * 60 * 1000));
  
  await db.insert(atendimentos).values({
    ...atendimento,
    inicio: agoraLocal,
    modificado_em: agoraLocal
  });
};


export const getAllAtendimentos = async () => {
  return await db.select().from(atendimentos);
};

export const stopAtendimento = async (id: number) => {
  const result = await db.select().from(atendimentos).where(eq(atendimentos.id, id));

  if (result.length === 0) {
    throw new Error("Atendimento não encontrado!");
  }

  const agora = new Date();
  const agoraLocal = new Date(agora.getTime() - (3 * 60 * 60 * 1000));
  const inicioLocal = new Date(result[0].inicio);

  const duracaoMs = agoraLocal.getTime() - inicioLocal.getTime();
  const duracaoHoras = duracaoMs / (1000 * 60 * 60);

  await db.update(atendimentos).set({
    ativo: false,
    fim: agoraLocal,
    modificado_em: agoraLocal,
    tempo_total_horas: duracaoHoras.toFixed(2),
  }).where(eq(atendimentos.id, id));
};