const { pgTable, uuid, text, integer, timestamp, boolean } = require('drizzle-orm/pg-core');
const { relations } = require('drizzle-orm');

// Users table
const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Books table
const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  isbn: text('isbn').unique(),
  totalCopies: integer('total_copies').notNull().default(1),
  availableCopies: integer('available_copies').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow(),
});

// Loans table
const loans = pgTable('loans', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bookId: uuid('book_id').notNull().references(() => books.id, { onDelete: 'cascade' }),
  borrowedAt: timestamp('borrowed_at').defaultNow(),
  dueDate: timestamp('due_date').notNull(),
  returnedAt: timestamp('returned_at'),
});

// Define relations
const usersRelations = relations(users, ({ many }) => ({
  loans: many(loans),
}));

const booksRelations = relations(books, ({ many }) => ({
  loans: many(loans),
}));

const loansRelations = relations(loans, ({ one }) => ({
  user: one(users, {
    fields: [loans.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [loans.bookId],
    references: [books.id],
  }),
}));

module.exports = {
  users,
  books,
  loans,
  usersRelations,
  booksRelations,
  loansRelations,
};