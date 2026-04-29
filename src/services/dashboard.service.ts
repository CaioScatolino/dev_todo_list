import { count, eq, sum } from "drizzle-orm";
import { atendimentos, devs } from "../db/schema";
import { db } from "../db/connection";

export const dashboardTempoPorDevService = async () => {

  const result = await db
    .select({
      dev: devs.nome,
      tipo: atendimentos.tipo,
      tempo_total_horas: sum(atendimentos.tempo_total_horas),
      quantidade_atendimentos: count(atendimentos.id),
    })
    .from(devs)
    .leftJoin(atendimentos, eq(devs.id, atendimentos.dev_id))
    .groupBy(devs.id, atendimentos.tipo);

  if (result.length === 0) {
    throw new Error("Nenhum atendimento encontrado!");
  }

  return result;
  
};
