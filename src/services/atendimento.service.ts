import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { atendimentos, NewAtendimento, devs } from "../db/schema";

export const createAtendimento = async (atendimento: NewAtendimento) => {
  const agora = new Date();
  await db.insert(atendimentos).values({
    ...atendimento,
    inicio: agora,
    modificado_em: agora
  });
};


export const getAllAtendimentos = async () => {
  return await db.select().from(atendimentos);
};

export const stopAtendimento = async (id: number) => {
  const result = await db
    .select({
      atendimento: atendimentos,
      dev: devs,
    })
    .from(atendimentos)
    .innerJoin(devs, eq(atendimentos.dev_id, devs.id))
    .where(eq(atendimentos.id, id));

  if (result.length === 0) return;

  const { atendimento, dev } = result[0];
  const inicioAtendimento = new Date(atendimento.inicio);
  const fimAtendimento = new Date();

  const tempoTotalHoras = calcularTempoNoTurno(
    inicioAtendimento,
    fimAtendimento,
    dev.inicio_turno,
    dev.fim_turno
  );

  await db.update(atendimentos).set({
    fim: fimAtendimento,
    ativo: false,
    tempo_total_horas: tempoTotalHoras.toFixed(2),
    modificado_em: fimAtendimento,
  }).where(eq(atendimentos.id, id));
};

function calcularTempoNoTurno(inicio: Date, fim: Date, shiftStartStr: string, shiftEndStr: string): number {
  const [sH, sM] = shiftStartStr.split(':').map(Number);
  const [eH, eM] = shiftEndStr.split(':').map(Number);

  const turnoInicio = new Date(inicio);
  turnoInicio.setHours(sH, sM, 0, 0);

  const turnoFim = new Date(inicio);
  turnoFim.setHours(eH, eM, 0, 0);

  if (turnoFim < turnoInicio) turnoFim.setDate(turnoFim.getDate() + 1);

  const realInicio = new Date(Math.max(inicio.getTime(), turnoInicio.getTime()));
  const realFim = new Date(Math.min(fim.getTime(), turnoFim.getTime()));

  const diffMs = realFim.getTime() - realInicio.getTime();
  
  return Math.max(0, diffMs / (1000 * 60 * 60));
}
