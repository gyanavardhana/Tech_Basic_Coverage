export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple Express API application with Swagger documentation',
  },
  servers: [
    {
      url: 'http://localhost:{port}',
      description: 'Local server',
      variables: {
        port: {
          default: '3000',
        },
      },
    },
  ],
  paths: {
    '/': {
      get: {
        summary: 'Get a welcome message',
        responses: {
          '200': {
            description: 'A successful response',
            content: {
              'text/plain': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/post': {
      post: {
        summary: 'Handle a POST request',
        responses: {
          '200': {
            description: 'A successful response',
          },
        },
      },
    },
    '/put': {
      put: {
        summary: 'Handle a PUT request',
        responses: {
          '200': {
            description: 'A successful response',
          },
        },
      },
    },
    '/delete': {
      delete: {
        summary: 'Handle a DELETE request',
        responses: {
          '200': {
            description: 'A successful response',
          },
        },
      },
    },
    '/register': {
      post: {
        summary: 'Register a new user',
        description:
          'Registers a new user with a username and password. Returns a success message if successful.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    description: 'The username of the user',
                    example: 'john_doe',
                  },
                  password: {
                    type: 'string',
                    description: 'The password of the user',
                    example: 'password123',
                  },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
          },
          '400': {
            description: 'User already exists',
          },
        },
      },
    },
    '/login': {
      post: {
        summary: 'Login a user',
        description:
          'Logs in a user with username and password. Returns a JWT token if successful.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    description: 'The username of the user',
                    example: 'john_doe',
                  },
                  password: {
                    type: 'string',
                    description: 'The password of the user',
                    example: 'password123',
                  },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful, JWT token returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      description: 'The JWT token for authenticated requests',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid credentials',
          },
        },
      },
    },
    '/logout': {
      post: {
        summary: 'Logout a user',
        description: 'Logs out a user. The client must discard the JWT token.',
        responses: {
          '200': {
            description: 'Logout successful',
          },
        },
      },
    },
    '/profile': {
      get: {
        summary: 'Get user profile',
        description:
          'Fetches the profile of the authenticated user. Requires a valid JWT token in the Authorization header.',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Profile data of the authenticated user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description:
                        'A welcome message for the authenticated user',
                      example: 'Welcome User 12345',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized, invalid or missing token',
          },
        },
      },
    },
    '/users': {
      get: {
        summary: 'Get all users',
        description: 'Fetches all the users in the system. Requires authentication.',
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'List of all users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'The user\'s unique identifier',
                      },
                      username: {
                        type: 'string',
                        description: 'The username of the user',
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized, invalid or missing token',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
