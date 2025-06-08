const { db } = require('../drizzle.config');
const { users, books, loans } = require('../db/models/schema');
const { eq, and, isNull } = require('drizzle-orm');
const ActivityLog = require('../db/models/ActivityLog');

// Utils
const getToday = () => new Date();
const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.insert(users).values({ name, email }).returning();
    const user = result[0];
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await db.select().from(users);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create Book
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, total_copies } = req.body;
    const result = await db.insert(books).values({
      title,
      author,
      isbn,
      total_copies,
      available_copies: total_copies
    }).returning();
    const book = result[0];
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await db.select().from(books);
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const { user_id, book_id, days_to_return = 7 } = req.body;
    
    const book = await db.select().from(books).where(eq(books.id, book_id));
    if (!book[0]) throw new Error('Book not found');
    if (book[0].available_copies < 1) throw new Error('No available copies');

    const today = getToday();
    const return_date = addDays(today, days_to_return);

    const result = await db.insert(loans).values({
      user_id,
      book_id,
      borrow_date: today,
      return_date,
      returned_date: null
    }).returning();

    await db.update(books)
      .set({ available_copies: book[0].available_copies - 1 })
      .where(eq(books.id, book_id));

    await ActivityLog.create({
      userId: user_id,
      action: 'borrowed',
      metadata: { book_id }
    });

    const loan = result[0];
    res.json({ success: true, data: loan });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;
    
    const activeLoan = await db.select()
      .from(loans)
      .where(and(eq(loans.user_id, user_id), eq(loans.book_id, book_id), isNull(loans.returned_date)));

    if (!activeLoan[0]) throw new Error('No active loan found for this book and user');

    const today = getToday();

    await db.update(loans)
      .set({ returned_date: today })
      .where(eq(loans.id, activeLoan[0].id));

    const book = await db.select().from(books).where(eq(books.id, book_id));
    await db.update(books)
      .set({ available_copies: book[0].available_copies + 1 })
      .where(eq(books.id, book_id));

    await ActivityLog.create({
      userId: user_id,
      action: 'returned',
      metadata: { book_id }
    });

    const result = { message: 'Book returned successfully' };
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get User Loans
const getUserLoans = async (req, res) => {
  try {
    const user_id = req.params.id;
    const loans = await db.select()
      .from(loans)
      .where(eq(loans.user_id, user_id));
    res.json({ success: true, data: loans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Search Books
const searchBooks = async (req, res) => {
  try {
    const { q, user_id } = req.query;
    const query = `%${q.toLowerCase()}%`;
    const books = await db.execute(
      `SELECT * FROM books WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1 OR LOWER(isbn) LIKE $1`,
      [query]
    );
    
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
};

// Get Overdue Books
const getOverdueBooks = async (req, res) => {
  try {
    const today = getToday();
    const overdue = await db.select()
      .from(loans)
      .where(and(
        isNull(loans.returned_date),
        loans.return_date.lt(today)
      ));
    res.json({ success: true, data: overdue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Logs
const getLogs = async (req, res) => {
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