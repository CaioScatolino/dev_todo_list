CREATE TABLE `devs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`inicio_turno` time NOT NULL,
	`fim_turno` time NOT NULL,
	`ativo` boolean NOT NULL DEFAULT true,
	`modificado_em` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `devs_id` PRIMARY KEY(`id`)
);
