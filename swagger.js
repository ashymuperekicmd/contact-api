// swagger.js - UPDATED VERSION
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A REST API for managing contacts with MongoDB',
      contact: {
        name: 'API Support',
        email: 'support@contactsapi.com'
      }
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated unique identifier for the contact'
            },
            firstName: {
              type: 'string',
              description: 'First name of the contact',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'Last name of the contact',
              example: 'Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the contact',
              example: 'john.doe@example.com'
            },
            favoriteColor: {
              type: 'string',
              description: 'Favorite color of the contact',
              example: 'Blue'
            },
            birthday: {
              type: 'string',
              format: 'date',
              description: 'Birthday of the contact in YYYY-MM-DD format',
              example: '1990-01-01'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the contact was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the contact was last updated'
            }
          }
        },
        ContactArray: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Contact'
          }
        }
      },
      responses: {
        ContactArray: {
          description: 'An array of contacts',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContactArray'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'] // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};