PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_verificationTokens` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_verificationTokens`("identifier", "token", "expires") SELECT "identifier", "token", "expires" FROM `verificationTokens`;--> statement-breakpoint
DROP TABLE `verificationTokens`;--> statement-breakpoint
ALTER TABLE `__new_verificationTokens` RENAME TO `verificationTokens`;--> statement-breakpoint
PRAGMA foreign_keys=ON;