const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/libcontroller')

// User routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id/loans', getUserLoans);

// Book routes
router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/search', searchBooks);
router.get('/books/overdue', getOverdueBooks);

// Loan routes
router.post('/borrow', borrowBook);
router.post('/return', returnBook);

// Activity logs
router.get('/logs', getLogs);

module.exports = router;