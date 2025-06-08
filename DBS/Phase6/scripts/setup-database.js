const path = require('path');
const { migrate } = require('drizzle-orm/node-postgres/migrator');
const { db } = require('../db/config/database.js');
const { users, books, loans } = require('../db/models/schema');
const ActivityLog = require('../db/models/ActivityLog'); // Assuming you're using MongoDB for activity logs
const { eq } = require('drizzle-orm');

async function setupDatabase() {
  try {
    console.log('Setting up database with Drizzle ORM...');

    const migrationsFolder = path.resolve(__dirname, '../db/migrations');
    await migrate(db, { migrationsFolder });
    console.log('Database migrations completed successfully');
    await db.delete(loans);
    await db.delete(users);
    await db.delete(books);

    console.log('Seeding sample data...');

    const [user1] = await db.insert(users).values({ name: 'John Doe', email: 'john.doe@email.com' }).returning();
    const [user2] = await db.insert(users).values({ name: 'Jane Smith', email: 'jane.smith@email.com' }).returning();
    const [user3] = await db.insert(users).values({ name: 'Bob Johnson', email: 'bob.johnson@email.com' }).returning();

    const [book1] = await db.insert(books).values({
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      totalCopies: 3,
      availableCopies: 3,
    }).returning();

    const [book2] = await db.insert(books).values({
      title: 'The Pragmatic Programmer',
      author: 'David Thomas',
      isbn: '978-0201616224',
      totalCopies: 2,
      availableCopies: 2,
    }).returning();

    const [book3] = await db.insert(books).values({
      title: 'Design Patterns',
      author: 'Gang of Four',
      isbn: '978-0201633612',
      totalCopies: 2,
      availableCopies: 2,
    }).returning();

    const [book4] = await db.insert(books).values({
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      isbn: '978-0596517748',
      totalCopies: 4,
      availableCopies: 4,
    }).returning();

    const [book5] = await db.insert(books).values({
      title: 'You Don\'t Know JS',
      author: 'Kyle Simpson',
      isbn: '978-1491950357',
      totalCopies: 2,
      availableCopies: 2,
    }).returning();

    console.log('Returned user2:', user2);
    console.log('Returned book2:', book2);

    const today = new Date();
    const returnDate1 = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days

    const [loan1] = await db.insert(loans).values({
      userId: user2.id,
      bookId: book2.id,
      borrowedAt: today,
      dueDate: returnDate1,
      returnedAt: null,
    }).returning();

    await db.update(books)
      .set({ availableCopies: book2.availableCopies - 1 })
      .where(eq(books.id, book2.id));

    await ActivityLog.create({
      userId: user2.id,
      action: 'borrowed',
      metadata: { bookId: book2.id },
    });

    const returnDate2 = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    const [loan2] = await db.insert(loans).values({
      userId: user1.id,
      bookId: book3.id,
      borrowedAt: today,
      dueDate: returnDate2,
      returnedAt: null,
    }).returning();

    await db.update(books)
      .set({ availableCopies: book3.availableCopies - 1 })
      .where(eq(books.id, book3.id));

    await ActivityLog.create({
      userId: user1.id,
      action: 'borrowed',
      metadata: { bookId: book3.id },
    });

    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
