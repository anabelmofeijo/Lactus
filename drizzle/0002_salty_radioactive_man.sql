CREATE TABLE `adminLoginAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`loginKey` varchar(96) NOT NULL,
	`failedAttempts` int NOT NULL DEFAULT 0,
	`lockedUntil` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `adminLoginAttempts_id` PRIMARY KEY(`id`),
	CONSTRAINT `adminLoginAttempts_loginKey_unique` UNIQUE(`loginKey`)
);
