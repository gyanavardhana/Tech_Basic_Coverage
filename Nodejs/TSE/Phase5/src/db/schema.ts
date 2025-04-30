import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    boolean
  } from 'drizzle-orm/pg-core';
  
  import { sql } from 'drizzle-orm';
  
  export const users = pgTable('users', {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`), // Requires pgcrypto or uuid-ossp extension
    username: varchar('username', { length: 100 }).notNull().unique(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
  });
  
  export const tasks = pgTable('tasks', {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    completed: boolean('completed').default(false),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
  });
  