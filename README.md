# Library API

This project is a simple Library API built with Node.js and Express.js. It allows you to manage a list of books through various RESTful API endpoints.

## API Endpoints

- **GET /books**: Retrieve all books.
- **POST /books**: Add a new book. (Request Body: `title`, `author`, `price`)
- **PUT /books/:id**: Update a book by ID. (Request Body: `title`, `author`, `price`)
- **DELETE /books/:id**: Delete a book by ID.

The server runs on `http://localhost:3000`.
