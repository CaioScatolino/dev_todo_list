import {
    mysqlTable,
    int,
    boolean,
    timestamp,
    datetime,
    mysqlEnum,
    decimal,
    varchar,
} from "drizzle-orm/mysql-core";
import { devs } from "./devs";
import { sql } from "drizzle-orm";

export const enumTipo = mysqlEnum("tipo", ["suporte", "desenvolvimento"]).notNull()

export const atendimentos = mysqlTable("TB_ATENDIMENTOS", {
    id: int("id").primaryKey().autoincrement(),
    dev_id: int("dev_id").notNull().references(() => devs.id),
    descricao: varchar("descricao", { length: 255 }).notNull(),
    solicitante: varchar("solicitante", { length: 255 }).notNull(),
    inicio: datetime("inicio").notNull().default(sql`now()`),
    fim: datetime("fim"),
    tipo: enumTipo,
    ativo: boolean("ativo").notNull().default(true),
    modificado_em: datetime("modificado_em").notNull().default(sql`now()`),
    tempo_total_horas: decimal("tempo_total_horas", { precision: 10, scale: 2 }).notNull().default('0.00'),
});

export type Atendimento = typeof atendimentos.$inferSelect;
export type NewAtendimento = typeof atendimentos.$inferInsert;
