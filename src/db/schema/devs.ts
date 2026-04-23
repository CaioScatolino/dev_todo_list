import {
  mysqlTable,
  varchar,
  int,
  time,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const devs = mysqlTable("devs", {
  id: int("id").primaryKey().autoincrement(),
  nome: varchar("nome", { length: 100 }).notNull(),
  inicio_turno: time("inicio_turno").notNull(),
  fim_turno: time("fim_turno").notNull(),
  ativo: boolean("ativo").notNull().default(true),
  modificado_em: timestamp("modificado_em").notNull().defaultNow(),
});
