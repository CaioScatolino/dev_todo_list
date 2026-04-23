import {
    mysqlTable,
    int,
    boolean,
    timestamp,
    datetime,
    varchar,
    mysqlEnum,
} from "drizzle-orm/mysql-core";
import { devs } from "./devs";

export const enumTipo = mysqlEnum("tipo", ["suporte", "desenvolvimento"]).notNull()

export const atendimentos = mysqlTable("TB_ATENDIMENTOS", {
    id: int("id").primaryKey().autoincrement(),
    dev_id: int("dev_id").notNull().references(() => devs.id),
    inicio: datetime("inicio").notNull(),
    tipo: enumTipo,
    fim: datetime("fim"),
    ativo: boolean("ativo").notNull().default(true),
    modificado_em: timestamp("modificado_em").notNull().defaultNow(),
});

export type Atendimento = typeof atendimentos.$inferSelect;
export type NewAtendimento = typeof atendimentos.$inferInsert;
