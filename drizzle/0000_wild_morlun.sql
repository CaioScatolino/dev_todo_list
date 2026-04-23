CREATE TABLE `TB_DEVS` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`inicio_turno` time NOT NULL,
	`fim_turno` time NOT NULL,
	`ativo` boolean NOT NULL DEFAULT true,
	`modificado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `TB_DEVS_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `TB_ATENDIMENTOS` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dev_id` int NOT NULL,
	`inicio` datetime NOT NULL,
	`fim` datetime,
	`ativo` boolean NOT NULL DEFAULT true,
	`modificado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `TB_ATENDIMENTOS_id` PRIMARY KEY(`id`)
);
