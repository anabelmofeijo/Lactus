CREATE TABLE `partnershipRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organizationName` varchar(180) NOT NULL,
	`contactName` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40),
	`requestType` enum('parceria','patrocinio','ambos','outro') NOT NULL,
	`location` varchar(180) NOT NULL,
	`projectContext` text NOT NULL,
	`objectives` text,
	`consentToContact` boolean NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partnershipRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
