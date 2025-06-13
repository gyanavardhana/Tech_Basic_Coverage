const { db } = require('../db/config/database.js');
const { eq, or, lt, and, ilike, isNull } = require('drizzle-orm');
const ActivityLog = require('../db/models/ActivityLog');
const { users, books, loans } = require('../db/models/schema');

// Utils
const getToday = () => new Date();
const addDays = (date, days) => new Date(date.getTime() + days * 86400000); // 24 * 60 * 60 * 1000

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.insert(users).values({ name, email }).returning();
    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json({ success: true, data: allUsers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create Book
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, totalCopies } = req.body;
    const result = await db.insert(books).values({
      title,
      author,
      isbn,
      totalCopies,
      availableCopies: totalCopies,
    }).returning();
    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await db.select().from(books);
    res.json({ success: true, data: allBooks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const { userId, book_id, days_to_return = 7 } = req.body;

    if (!userId || !book_id) {
      return res.status(400).json({ success: false, error: 'Missing userId or book_id' });
    }

    // Check for existing active loan for same user and book
    const existingLoan = await db.select().from(loans).where(and(
      eq(loans.userId, userId),
      eq(loans.bookId, book_id),
      isNull(loans.returnedAt)
    ));

    if (existingLoan.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'User already has an active loan for this book'
      });
    }

    const book = await db.select().from(books).where(eq(books.id, book_id));
    if (!book[0]) throw new Error('Book not found');

    const availableCopies = book[0].availableCopies || 0;
    if (availableCopies < 1) throw new Error('No available copies left');

    const today = getToday();
    const returnDate = addDays(today, days_to_return);

    const result = await db.insert(loans).values({
      userId,
      bookId: book_id,
      borrowedAt: today,
      dueDate: returnDate,
      returnedAt: null,
    }).returning();

    await db.update(books)
      .set({ availableCopies: availableCopies - 1 })
      .where(eq(books.id, book_id));

    await ActivityLog.create({
      userId,
      action: 'borrowed',
      metadata: { book_id },
    });

    res.json({ success: true, data: result[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const { userId, book_id } = req.body;

    const activeLoan = await db.select().from(loans)
      .where(and(eq(loans.userId, userId), eq(loans.bookId, book_id), isNull(loans.returnedAt)));

    if (!activeLoan[0]) throw new Error('No active loan found for this book and user');

    const today = getToday();
    await db.update(loans)
      .set({ returnedAt: today })
      .where(eq(loans.id, activeLoan[0].id));

    const book = await db.select().from(books).where(eq(books.id, book_id));
    await db.update(books)
      .set({ availableCopies: book[0].availableCopies + 1 })
      .where(eq(books.id, book_id));

    await ActivityLog.create({
      userId,
      action: 'returned',
      metadata: { book_id },
    });

    res.json({ success: true, data: { message: 'Book returned successfully' } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get User Loans
const getUserLoans = async (req, res) => {
  try {
    const userId = req.params.id;
    const userLoans = await db.select().from(loans).where(eq(loans.userId, userId));
    res.json({ success: true, data: userLoans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Search Books
const searchBooks = async (req, res) => {
  try {
    const { q, userId } = req.query;
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ success: false, error: 'Missing or invalid search query (q)' });
    }

    const query = `%${q.toLowerCase()}%`;

    const searchResults = await db
      .select()
      .from(books)
      .where(or(
        ilike(books.title, query),
        ilike(books.author, query),
        ilike(books.isbn, query)
      ));

    if (userId) {
      await ActivityLog.create({
        userId,
        action: 'searched',
        metadata: { searchQuery: q },
      });
    }

    res.json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Overdue Books
const getOverdueBooks = async (req, res) => {
  try {
    const today = getToday();
    const overdue = await db
      .select()
      .from(loans)
      .where(and(
        isNull(loans.returnedAt),
        lt(loans.dueDate, today)
      ));

    res.json({ success: true, data: overdue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Activity Logs
const getLogs = async (req, res) => {
  try {
    const { userId, action, limit = 50 } = req.query;
    const filter = {};
    if (userId) filter.userId = userId;
    if (action) filter.action = action;

    const logs = await ActivityLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  createBook,
  getAllBooks,
  borrowBook,
  returnBook,
  getUserLoans,
  searchBooks,
  getOverdueBooks,
  getLogs
};
