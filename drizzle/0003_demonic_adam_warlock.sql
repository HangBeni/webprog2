CREATE TABLE `comments` (
	`id` integer PRIMARY KEY NOT NULL,
	`band` integer,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`modified_at` text,
	FOREIGN KEY (`band`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
