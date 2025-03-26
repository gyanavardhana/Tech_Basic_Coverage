// - Error Handling (`try-catch`, `throw`)

// Error Handling
// - `try-catch` block


try {
  // code that can throw an error
  throw new Error('Error message');
}
catch (error) {
  // code to handle the error
  console.log(error.message);
}

// - `throw` keyword
// - `finally` block
try {
  throw new Error('Error message');
}
catch (error) {
  console.log(error.message);
}
finally {
  console.log('Finally block');
}

// - Custom Error
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

try {
  throw new CustomError('Custom Error message');
}
catch (error) {
  console.log(error.message);
}
finally {
  console.log('Finally block');
}