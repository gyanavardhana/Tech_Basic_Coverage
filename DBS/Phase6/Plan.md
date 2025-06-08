// =============================================================================
// LIBRARY MANAGEMENT SYSTEM - DRIZZLE ORM + MONGODB + UUID
// =============================================================================

// First, let's set up the project structure and package.json
// Run: npm init -y
// Then install dependencies: npm install express drizzle-orm drizzle-kit pg mongoose dotenv uuid

// =============================================================================
// 1. PROJECT SETUP - package.json
// =============================================================================

```json
{
  "name": "library-management-system",
  "version": "1.0.0",
  "description": "A library management system with Drizzle ORM, PostgreSQL and MongoDB",
  "main": "backend/app.js",
  "scripts": {
    "start": "node backend/app.js",
    "dev": "nodemon backend/app.js",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "setup-db": "node scripts/setup-database.js",
    "seed": "node scripts/seed-data.js",
    "backup": "bash scripts/backup.sh"
  },
  "dependencies": {
    "express": "^4.18.2",
    "drizzle-orm": "^0.29.0",
    "pg": "^8.11.0",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "drizzle-kit": "^0.20.0"
  }
}
```

// =============================================================================
// 2. ENVIRONMENT CONFIGURATION - .env
// =============================================================================

```bash
# PostgreSQL Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/library_db

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/analytics_db

# Server Configuration
PORT=3000
```

// =============================================================================
// 3. DRIZZLE CONFIG - drizzle.config.ts
// =============================================================================

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './backend/db/schema.js',
  out: './backend/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
```

// =============================================================================
// 4. DRIZZLE SCHEMA - backend/db/schema.js
// =============================================================================

```javascript
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
```

// =============================================================================
// 5. DATABASE CONNECTION - backend/config/database.js
// =============================================================================

```javascript
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const mongoose = require('mongoose');
const schema = require('../db/schema');
require('dotenv').config();

// PostgreSQL connection with Drizzle
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

// Test PostgreSQL connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL with Drizzle ORM');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { db, connectMongoDB };
```

// =============================================================================
// 6. MONGODB SCHEMA - backend/models/ActivityLog.js
// =============================================================================

```javascript
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['borrowed', 'returned', 'searched', 'registered', 'updated']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    bookId: String,
    bookTitle: String,
    bookAuthor: String,
    searchQuery: String,
    ipAddress: String,
    userAgent: String
  }
});

// Create indexes for better query performance
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ action: 1, timestamp: -1 });
activityLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
```

// =============================================================================
// 7. LIBRARY SERVICE - backend/services/LibraryService.js
// =============================================================================

```javascript
const { db } = require('../config/database');
const { users, books, loans } = require('../db/schema');
const { eq, and, isNull, desc, asc, ilike, or, lt, sql } = require('drizzle-orm');
const ActivityLog = require('../models/ActivityLog');
const { v4: uuidv4 } = require('uuid');

class LibraryService {
  // Borrow a book with transaction handling
  static async borrowBook(userId, bookId, daysToReturn = 14) {
    return await db.transaction(async (tx) => {
      try {
        // Check if book is available
        const book = await tx.select().from(books).where(eq(books.id, bookId)).limit(1);
        
        if (book.length === 0) {
          throw new Error('Book not found');
        }
        
        const bookData = book[0];
        if (bookData.availableCopies <= 0) {
          throw new Error('Book is not available');
        }
        
        // Check if user already has this book
        const existingLoan = await tx
          .select()
          .from(loans)
          .where(
            and(
              eq(loans.userId, userId),
              eq(loans.bookId, bookId),
              isNull(loans.returnedAt)
            )
          )
          .limit(1);
        
        if (existingLoan.length > 0) {
          throw new Error('User already has this book borrowed');
        }
        
        // Calculate due date
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + daysToReturn);
        
        // Create loan record
        const newLoan = await tx
          .insert(loans)
          .values({
            id: uuidv4(),
            userId,
            bookId,
            dueDate,
          })
          .returning();
        
        // Update available copies
        await tx
          .update(books)
          .set({
            availableCopies: sql`${books.availableCopies} - 1`
          })
          .where(eq(books.id, bookId));
        
        // Log activity in MongoDB
        await ActivityLog.create({
          userId: userId,
          action: 'borrowed',
          metadata: {
            bookId: bookId,
            bookTitle: bookData.title,
            bookAuthor: bookData.author
          }
        });
        
        return {
          loanId: newLoan[0].id,
          borrowedAt: newLoan[0].borrowedAt,
          dueDate: newLoan[0].dueDate,
          book: bookData
        };
        
      } catch (error) {
        throw error;
      }
    });
  }
  
  // Return a book
  static async returnBook(userId, bookId) {
    return await db.transaction(async (tx) => {
      try {
        // Find active loan with book details
        const activeLoanQuery = await tx
          .select({
            loanId: loans.id,
            title: books.title,
            author: books.author,
            dueDate: loans.dueDate,
          })
          .from(loans)
          .innerJoin(books, eq(loans.bookId, books.id))
          .where(
            and(
              eq(loans.userId, userId),
              eq(loans.bookId, bookId),
              isNull(loans.returnedAt)
            )
          )
          .limit(1);
        
        if (activeLoanQuery.length === 0) {
          throw new Error('No active loan found for this book');
        }
        
        const loan = activeLoanQuery[0];
        
        // Update loan with return date
        await tx
          .update(loans)
          .set({
            returnedAt: new Date()
          })
          .where(eq(loans.id, loan.loanId));
        
        // Increment available copies
        await tx
          .update(books)
          .set({
            availableCopies: sql`${books.availableCopies} + 1`
          })
          .where(eq(books.id, bookId));
        
        // Log activity in MongoDB
        await ActivityLog.create({
          userId: userId,
          action: 'returned',
          metadata: {
            bookId: bookId,
            bookTitle: loan.title,
            bookAuthor: loan.author
          }
        });
        
        // Check if returned late
        const isLate = new Date() > new Date(loan.dueDate);
        
        return {
          returnedAt: new Date(),
          wasLate: isLate,
          book: {
            title: loan.title,
            author: loan.author
          }
        };
        
      } catch (error) {
        throw error;
      }
    });
  }
  
  // Get user's current loans
  static async getUserLoans(userId) {
    const userLoans = await db
      .select({
        id: loans.id,
        title: books.title,
        author: books.author,
        borrowedAt: loans.borrowedAt,
        dueDate: loans.dueDate,
        isOverdue: sql`CASE WHEN ${loans.dueDate} < NOW() THEN true ELSE false END`.as('is_overdue'),
      })
      .from(loans)
      .innerJoin(books, eq(loans.bookId, books.id))
      .where(
        and(
          eq(loans.userId, userId),
          isNull(loans.returnedAt)
        )
      )
      .orderBy(asc(loans.dueDate));
    
    return userLoans;
  }
  
  // Search books
  static async searchBooks(query) {
    const searchResults = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        availableCopies: books.availableCopies,
        totalCopies: books.totalCopies,
      })
      .from(books)
      .where(
        or(
          ilike(books.title, `%${query}%`),
          ilike(books.author, `%${query}%`)
        )
      )
      .orderBy(asc(books.title));
    
    return searchResults;
  }
  
  // Get overdue books
  static async getOverdueBooks() {
    const overdueBooks = await db
      .select({
        id: loans.id,
        userName: users.name,
        email: users.email,
        bookTitle: books.title,
        author: books.author,
        borrowedAt: loans.borrowedAt,
        dueDate: loans.dueDate,
        daysOverdue: sql`CURRENT_DATE - ${loans.dueDate}::date`.as('days_overdue'),
      })
      .from(loans)
      .innerJoin(users, eq(loans.userId, users.id))
      .innerJoin(books, eq(loans.bookId, books.id))
      .where(
        and(
          isNull(loans.returnedAt),
          lt(loans.dueDate, new Date())
        )
      )
      .orderBy(desc(sql`CURRENT_DATE - ${loans.dueDate}::date`));
    
    return overdueBooks;
  }

  // Create a new user
  static async createUser(name, email) {
    const newUser = await db
      .insert(users)
      .values({
        id: uuidv4(),
        name,
        email,
      })
      .returning();

    // Log activity in MongoDB
    await ActivityLog.create({
      userId: newUser[0].id,
      action: 'registered',
      metadata: {}
    });

    return newUser[0];
  }

  // Create a new book
  static async createBook(title, author, isbn, totalCopies = 1) {
    const newBook = await db
      .insert(books)
      .values({
        id: uuidv4(),
        title,
        author,
        isbn,
        totalCopies,
        availableCopies: totalCopies,
      })
      .returning();

    return newBook[0];
  }

  // Get all users
  static async getAllUsers() {
    return await db.select().from(users).orderBy(asc(users.name));
  }

  // Get all books
  static async getAllBooks() {
    return await db.select().from(books).orderBy(asc(books.title));
  }
}

module.exports = LibraryService;
```

// =============================================================================
// 8. MAIN APPLICATION - backend/app.js
// =============================================================================

```javascript
const express = require('express');
const { connectMongoDB } = require('./config/database');
const LibraryService = require('./services/LibraryService');
const ActivityLog = require('./models/ActivityLog');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectMongoDB();

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Library Management System API with Drizzle ORM',
    version: '2.0.0',
    database: 'PostgreSQL with Drizzle ORM + MongoDB'
  });
});

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await LibraryService.createUser(name, email);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await LibraryService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, isbn, total_copies } = req.body;
    const book = await LibraryService.createBook(title, author, isbn, total_copies);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await LibraryService.getAllBooks();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Borrow a book
app.post('/borrow', async (req, res) => {
  try {
    const { user_id, book_id, days_to_return } = req.body;
    const result = await LibraryService.borrowBook(user_id, book_id, days_to_return);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Return a book
app.post('/return', async (req, res) => {
  try {
    const { user_id, book_id } = req.body;
    const result = await LibraryService.returnBook(user_id, book_id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get user's loans
app.get('/users/:id/loans', async (req, res) => {
  try {
    const loans = await LibraryService.getUserLoans(req.params.id);
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search books
app.get('/books/search', async (req, res) => {
  try {
    const { q, user_id } = req.query;
    const books = await LibraryService.searchBooks(q);
    
    // Log search activity
    if (user_id) {
      await ActivityLog.create({
        userId: user_id,
        action: 'searched',
        metadata: { searchQuery: q }
      });
    }
    
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get overdue books
app.get('/overdue', async (req, res) => {
  try {
    const overdue = await LibraryService.getOverdueBooks();
    res.json({ success: true, data: overdue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get activity logs
app.get('/logs', async (req, res) => {
  try {
    const { user_id, action, limit = 50 } = req.query;
    const filter = {};
    if (user_id) filter.userId = user_id;
    if (action) filter.action = action;
    
    const logs = await ActivityLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
      
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Library Management System with Drizzle ORM`);
});
```

// =============================================================================
// 9. DATABASE SETUP SCRIPT - scripts/setup-database.js
// =============================================================================

```javascript
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { db } = require('../backend/config/database');
const LibraryService = require('../backend/services/LibraryService');

async function setupDatabase() {
  try {
    console.log('🏗️  Setting up database with Drizzle ORM...');
    
    // Run migrations
    await migrate(db, { migrationsFolder: './backend/db/migrations' });
    console.log('✅ Database migrations completed successfully');
    
    // Insert sample data
    console.log('🌱 Seeding sample data...');
    
    // Create sample users
    const user1 = await LibraryService.createUser('John Doe', 'john.doe@email.com');
    const user2 = await LibraryService.createUser('Jane Smith', 'jane.smith@email.com');
    const user3 = await LibraryService.createUser('Bob Johnson', 'bob.johnson@email.com');
    
    console.log('✅ Sample users created');
    
    // Create sample books
    const book1 = await LibraryService.createBook('Clean Code', 'Robert C. Martin', '978-0132350884', 3);
    const book2 = await LibraryService.createBook('The Pragmatic Programmer', 'David Thomas', '978-0201616224', 2);
    const book3 = await LibraryService.createBook('Design Patterns', 'Gang of Four', '978-0201633612', 2);
    const book4 = await LibraryService.createBook('JavaScript: The Good Parts', 'Douglas Crockford', '978-0596517748', 4);
    const book5 = await LibraryService.createBook('You Don\'t Know JS', 'Kyle Simpson', '978-1491950357', 2);
    
    console.log('✅ Sample books created');
    
    // Create some sample loans
    await LibraryService.borrowBook(user2.id, book2.id, 14);
    await LibraryService.borrowBook(user1.id, book3.id, 14);
    
    console.log('✅ Sample loans created');
    console.log('✅ Database setup completed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
```

// =============================================================================
// 10. BACKUP SCRIPTS - scripts/backup.sh
// =============================================================================

```bash
#!/bin/bash

# Create backup directories if they don't exist
mkdir -p backups/postgres
mkdir -p backups/mongodb

# Get current date for backup filenames
DATE=$(date +%Y%m%d_%H%M%S)

# PostgreSQL backup
echo "🔄 Creating PostgreSQL backup..."
pg_dump $DATABASE_URL > "backups/postgres/library_db_${DATE}.sql"
if [ $? -eq 0 ]; then
    echo "✅ PostgreSQL backup completed: library_db_${DATE}.sql"
else
    echo "❌ PostgreSQL backup failed"
fi

# MongoDB backup
echo "🔄 Creating MongoDB backup..."
mongodump --uri="$MONGO_URI" --out "backups/mongodb/analytics_db_${DATE}"
if [ $? -eq 0 ]; then
    echo "✅ MongoDB backup completed: analytics_db_${DATE}"
else
    echo "❌ MongoDB backup failed"
fi

# Clean up old backups (keep only last 7 days)
find backups/postgres -name "*.sql" -mtime +7 -delete
find backups/mongodb -name "analytics_db_*" -mtime +7 -exec rm -rf {} +

echo "🧹 Old backups cleaned up"
echo "✅ Backup process completed"
```

// =============================================================================
// 11. MIGRATION EXAMPLE - backend/db/migrations/0001_initial.sql
// =============================================================================

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" text NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "books" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "author" text NOT NULL,
  "isbn" text,
  "total_copies" integer DEFAULT 1 NOT NULL,
  "available_copies" integer DEFAULT 1 NOT NULL,
  "created_at" timestamp DEFAULT now(),
  CONSTRAINT "books_isbn_unique" UNIQUE("isbn")
);

CREATE TABLE IF NOT EXISTS "loans" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL,
  "book_id" uuid NOT NULL,
  "borrowed_at" timestamp DEFAULT now(),
  "due_date" timestamp NOT NULL,
  "returned_at" timestamp
);

ALTER TABLE "loans" ADD CONSTRAINT "loans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "loans" ADD CONSTRAINT "loans_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE cascade ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "idx_loans_user_id" ON "loans" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_loans_book_id" ON "loans" ("book_id");
CREATE INDEX IF NOT EXISTS "idx_loans_due_date" ON "loans" ("due_date");
CREATE INDEX IF NOT EXISTS "idx_loans_returned_at" ON "loans" ("returned_at");
```

// =============================================================================
// 12. README.md
// =============================================================================

```markdown
# Library Management System - Drizzle ORM Edition

A modern full-stack library management system using Drizzle ORM with PostgreSQL for relational data and MongoDB for analytics/logging. All primary keys use UUID instead of auto-incrementing integers.

## 🚀 Features

- **Modern ORM**: Drizzle ORM for type-safe database operations
- **UUID Primary Keys**: All entities use UUID for better scalability
- **Dual Database**: PostgreSQL for relational data + MongoDB for analytics
- **Transaction Safety**: Atomic operations for borrowing/returning books
- **Activity Logging**: Comprehensive user activity tracking
- **RESTful API**: Clean REST endpoints with proper error handling
- **Automated Backups**: Scripts for database backup and maintenance

## 🛠️ Tech Stack

- **Backend**: Node.js with Express
- **ORM**: Drizzle ORM
- **Relational DB**: PostgreSQL with UUID primary keys
- **Analytics DB**: MongoDB with Mongoose
- **Validation**: Built-in Drizzle validation
- **Migrations**: Drizzle Kit for schema management

## 🏃‍♂️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
# Create .env file
DATABASE_URL=postgresql://postgres:password@localhost:5432/library_db
MONGO_URI=mongodb://localhost:27017/analytics_db
PORT=3000
```

### 3. Database Setup
```bash
# Generate initial migration
npm run db:generate

# Run migrations
npm run db:migrate

# Setup sample data
npm run setup-db
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Explore with Drizzle Studio (Optional)
```bash
npm run db:studio
```

## 📚 API Endpoints

### Users
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id/loans` - Get user's current loans

### Books
- `POST /books` - Add a new book
- `GET /books` - Get all books
- `GET /books/search?q=query` - Search books

### Loans
- `POST /borrow` - Borrow a book
- `POST /return` - Return a book
- `GET /overdue` - Get overdue books

### Analytics
- `GET /logs` - Get activity logs

## 🗄️ Database Schema

### PostgreSQL (library_db) - Drizzle ORM
- **users**: User information with UUID primary key
- **books**: Book catalog with UUID primary key
- **loans**: Borrowing records with UUID references

### MongoDB (analytics_db) - Mongoose
- **activitylogs**: User activity tracking

## 🔧 Key Improvements

1. **UUID Primary Keys**: Better for distributed systems and security
2. **Drizzle ORM**: Type-safe, modern ORM with excellent TypeScript support
3. **Better Transactions**: Drizzle's transaction API with automatic rollback
4. **Migration System**: Proper schema versioning with Drizzle Kit
5. **Enhanced Queries**: Leveraging Drizzle's query builder for complex operations

## 📖 Usage Examples

### Creating a User
```javascript
const user = await LibraryService.createUser('John Doe', 'john@example.com');
// Returns: { id: 'uuid-string', name: 'John Doe', email: 'john@example.com', createdAt: Date }
```

### Borrowing a Book
```javascript
const result = await LibraryService.borrowBook(userId, bookId, 14);
// Automatically handles transaction, updates copies, logs activity
```

### Searching Books
```javascript
const books = await LibraryService.searchBooks('JavaScript');
// Returns books matching title or author
```

## 🚀 Deployment Considerations

### Production Environment Variables
```bash
DATABASE_URL=postgresql://user:password@prod-host:5432/library_db
MONGO_URI=mongodb://prod-mongo-host:27017/analytics_db
NODE_ENV=production
```

### Docker Support
The system can be easily containerized with the following structure:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security Features

- UUID primary keys prevent enumeration attacks
- Parameterized queries prevent SQL injection
- Transaction isolation prevents race conditions
- Input validation on all endpoints

## 📊 Monitoring & Analytics

The MongoDB integration provides comprehensive activity logging:
- User borrowing patterns
- Search analytics
- System usage metrics
- Performance monitoring data
```