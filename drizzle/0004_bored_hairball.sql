CREATE TABLE `lumiInstallations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pointName` varchar(180) NOT NULL,
	`companyName` varchar(180) NOT NULL,
	`contactName` varchar(180),
	`contactEmail` varchar(320),
	`location` varchar(180) NOT NULL,
	`installedAt` timestamp,
	`status` enum('operacional','manutencao','retirado') NOT NULL DEFAULT 'operacional',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lumiInstallations_id` PRIMARY KEY(`id`)
);
