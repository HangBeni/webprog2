import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'

export const bands = sqliteTable("bands", {
    id: integer('id').primaryKey({autoIncrement:true}),
	name: text('name').notNull(),
	birth: text('birth').notNull(),
	story: text('story').notNull(),
	genre: text('genre').notNull()
})

export const users = sqliteTable("users", {
    id: integer('id').primaryKey(),
	name: text('name').notNull(),
	band_id: integer('band_id').notNull().references(() => bands.id),
	password: text('password').notNull(),
	email: text('email').notNull()
});

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

export const posts = sqliteTable("posts", {
    id: integer('id').primaryKey({autoIncrement: true}),
	author: text('author').notNull(),
	content: text('content').notNull(),
	created_at: text('created_at').notNull().default(sql`(current_timestamp)`),
	modified_at: text('modified_at')
})

export const comments = sqliteTable("posts", {
    id:  integer('id').primaryKey(),
	post_id: integer('band').references(() => posts.id),
	author: text('author').notNull(),
	content:  text('content').notNull(),
	created_at: text('created_at').notNull().default(sql`(current_timestamp)`),
	modified_at: text('modified_at')
})
