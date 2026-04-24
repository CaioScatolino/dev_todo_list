ALTER TABLE `TB_ATENDIMENTOS` MODIFY COLUMN `inicio` datetime NOT NULL DEFAULT now();--> statement-breakpoint
ALTER TABLE `TB_ATENDIMENTOS` MODIFY COLUMN `modificado_em` datetime NOT NULL DEFAULT now();--> statement-breakpoint
ALTER TABLE `TB_ATENDIMENTOS` MODIFY COLUMN `tempo_total_horas` decimal(10,2) NOT NULL DEFAULT '0.00';