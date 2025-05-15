const swaggerJsDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Wallet System API',
    version: '1.0.0',
    description: 'Simple wallet system using Node.js, PostgreSQL, and Docker'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/user': {
      post: {
        tags: ['User'],
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' }
                },
                required: ['name', 'email']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'User created successfully'
          },
          400: {
            description: 'Validation error'
          }
        }
      }
    },
    '/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login to get JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' }
                },
                required: ['email']
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Login success, returns token'
          },
          404: {
            description: 'User not found'
          }
        }
      }
    },
    '/transaction': {
      post: {
        tags: ['Transaction'],
        summary: 'Add or withdraw money',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['ADD', 'WITHDRAW'] },
                  amount: { type: 'number' }
                },
                required: ['type', 'amount']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Transaction successful'
          },
          400: {
            description: 'Invalid or insufficient funds'
          }
        }
      }
    },
    '/user/{id}': {
      get: {
        tags: ['User'],
        summary: 'Get user details by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: { description: 'User data' },
          404: { description: 'User not found' }
        }
      }
    },
    '/user/{id}/transactions': {
      get: {
        tags: ['Transaction'],
        summary: 'Get transaction history',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Paginated transaction list' }
        }
      }
    }
  }
};

module.exports = swaggerJsDoc;
