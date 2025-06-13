const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management System API',
      version: '1.0.0',
      description: 'A comprehensive library management system API for managing users, books, loans, and activity logs',
      contact: {
        name: 'API Support',
        email: 'support@library.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://ubiquitous-spork-jw7wqw9qgqpc56p9-3000.app.github.dev/api',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the user'
            },
            name: {
              type: 'string',
              description: 'Full name of the user',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
              example: 'john.doe@example.com'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        Book: {
          type: 'object',
          required: ['title', 'author', 'isbn', 'totalCopies'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the book'
            },
            title: {
              type: 'string',
              description: 'Title of the book',
              example: 'The Great Gatsby'
            },
            author: {
              type: 'string',
              description: 'Author of the book',
              example: 'F. Scott Fitzgerald'
            },
            isbn: {
              type: 'string',
              description: 'ISBN number of the book',
              example: '978-0-7432-7356-5'
            },
            totalCopies: {
              type: 'integer',
              description: 'Total number of copies available',
              example: 5
            },
            availableCopies: {
              type: 'integer',
              description: 'Number of copies currently available',
              example: 3
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Book creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Book last update timestamp'
            }
          }
        },
        Loan: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the loan'
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user who borrowed the book'
            },
            bookId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the borrowed book'
            },
            borrowedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date when the book was borrowed'
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              description: 'Expected return date'
            },
            returnedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Actual return date (null if not returned)'
            }
          }
        },
        ActivityLog: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the log entry'
            },
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user who performed the action'
            },
            action: {
              type: 'string',
              enum: ['borrowed', 'returned', 'searched', 'registered', 'updated'],
              description: 'Type of action performed'
            },
            metadata: {
              type: 'object',
              description: 'Additional data related to the action',
              properties: {
                bookId: { type: 'string', format: 'uuid' },
                bookTitle: { type: 'string' },
                bookAuthor: { type: 'string' },
                searchQuery: { type: 'string' },
                ipAddress: { type: 'string' },
                userAgent: { type: 'string' }
              }
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'When the action was performed'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful'
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            error: {
              type: 'string',
              description: 'Error message if request failed'
            }
          }
        },
        BorrowBookRequest: {
          type: 'object',
          required: ['userId', 'bookId'],
          properties: {
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user borrowing the book'
            },
            bookId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the book to borrow'
            },
            days_to_return: {
              type: 'integer',
              default: 7,
              description: 'Number of days until return (default: 7)'
            }
          }
        },
        ReturnBookRequest: {
          type: 'object',
          required: ['userId', 'bookId'],
          properties: {
            userId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user returning the book'
            },
            bookId: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the book to return'
            }
          }
        }
      },
      responses: {
        Success: {
          description: 'Successful operation',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiResponse'
              }
            }
          }
        },
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  error: {
                    type: 'string',
                    example: 'Invalid request data'
                  }
                }
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  error: {
                    type: 'string',
                    example: 'Resource not found'
                  }
                }
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false
                  },
                  error: {
                    type: 'string',
                    example: 'Internal server error'
                  }
                }
              }
            }
          }
        }
      }
    },
    paths: {
      '/users': {
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          description: 'Creates a new user in the library system',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email'],
                  properties: {
                    name: {
                      type: 'string',
                      example: 'John Doe'
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john.doe@example.com'
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        $ref: '#/components/schemas/User'
                      }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' }
          }
        },
        get: {
          tags: ['Users'],
          summary: 'Get all users',
          description: 'Retrieves a list of all users in the system',
          responses: {
            200: {
              description: 'Users retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/User'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      },
      '/users/{id}/loans': {
        get: {
          tags: ['Users'],
          summary: 'Get user loans',
          description: 'Retrieves all loans for a specific user',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
                format: 'uuid'
              },
              description: 'User ID'
            }
          ],
          responses: {
            200: {
              description: 'User loans retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Loan'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      },
      '/books': {
        post: {
          tags: ['Books'],
          summary: 'Create a new book',
          description: 'Adds a new book to the library inventory',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'author', 'isbn', 'totalCopies'],
                  properties: {
                    title: {
                      type: 'string',
                      example: 'The Great Gatsby'
                    },
                    author: {
                      type: 'string',
                      example: 'F. Scott Fitzgerald'
                    },
                    isbn: {
                      type: 'string',
                      example: '978-0-7432-7356-5'
                    },
                    totalCopies: {
                      type: 'integer',
                      example: 5
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Book created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        $ref: '#/components/schemas/Book'
                      }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' }
          }
        },
        get: {
          tags: ['Books'],
          summary: 'Get all books',
          description: 'Retrieves a list of all books in the library',
          responses: {
            200: {
              description: 'Books retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Book'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      },
      '/books/search': {
        get: {
          tags: ['Books'],
          summary: 'Search books',
          description: 'Search books by title, author, or ISBN',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Search query'
            },
            {
              name: 'userId',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                format: 'uuid'
              },
              description: 'User ID (for logging search activity)'
            }
          ],
          responses: {
            200: {
              description: 'Search results retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Book'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      },
      '/loans/borrow': {
        post: {
          tags: ['Loans'],
          summary: 'Borrow a book',
          description: 'Creates a new loan record for a user borrowing a book',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BorrowBookRequest'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Book borrowed successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        $ref: '#/components/schemas/Loan'
                      }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' }
          }
        }
      },
      '/loans/return': {
        post: {
          tags: ['Loans'],
          summary: 'Return a book',
          description: 'Marks a borrowed book as returned',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ReturnBookRequest'
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Book returned successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',
                            example: 'Book returned successfully'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: { $ref: '#/components/responses/BadRequest' }
          }
        }
      },
      '/loans/overdue': {
        get: {
          tags: ['Loans'],
          summary: 'Get overdue books',
          description: 'Retrieves all loans that are past their return date',
          responses: {
            200: {
              description: 'Overdue loans retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Loan'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      },
      '/logs': {
        get: {
          tags: ['Activity Logs'],
          summary: 'Get activity logs',
          description: 'Retrieves activity logs with optional filtering',
          parameters: [
            {
              name: 'userId',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                format: 'uuid'
              },
              description: 'Filter by user ID'
            },
            {
              name: 'action',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['borrowed', 'returned', 'searched', 'registered', 'updated']
              },
              description: 'Filter by action type'
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: {
                type: 'integer',
                default: 50
              },
              description: 'Maximum number of logs to return'
            }
          ],
          responses: {
            200: {
              description: 'Activity logs retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/ActivityLog'
                        }
                      }
                    }
                  }
                }
              }
            },
            500: { $ref: '#/components/responses/InternalServerError' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
