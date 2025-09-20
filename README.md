# Contacts API

A RESTful API for managing contacts built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete contacts
- MongoDB database integration
- Swagger API documentation
- RESTful design

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /contacts | Get all contacts |
| GET | /contacts/:id | Get a specific contact |
| POST | /contacts | Create a new contact |
| PUT | /contacts/:id | Update a contact |
| DELETE | /contacts/:id | Delete a contact |

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string
4. Start the server: `npm run dev`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

## API Documentation

Visit `/api-docs` for interactive Swagger documentation.