'use strict';
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const data = require('./books.json');

const app = express();
app.use(express.json());


function saveData() {
    fs.writeFileSync('./books.json', JSON.stringify(data, null, 2));
}  

// READ   - GET     - /books
// CREATE - POST    - /books
// UPDATE - PUT     - /books/:id
// DELETE - DELETE  - /books/:id

app.get("/books", readBooks);
app.post("/books", createBooks);
app.put("/books/:id", updateBooks);
app.delete("/books/:id", deleteBooks);

function readBooks(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  }
  

  function createBooks(req, res) {
    if (!req.body.title || !req.body.author) {
      res.status(400).send("Invalid request");
      return;
    }
  
    const id = uuidv4();
    const newBook = {
      id: id,
      title: req.body.title,
      author: req.body.author
    };
  
    data.push(newBook);
    saveData();
  
    res.status(201).json({
      message: "Book created",
      book: newBook
    });
  }
  
    

  function updateBooks(req, res) {
    if (!req.body.title || !req.body.author) {
      res.status(400).send("Invalid request");
      return;
    }
  
    const id = req.params.id;
    const bookIndex = data.findIndex(book => book.id === id);
  
    if (bookIndex === -1) {
      res.status(404).send("Book not found");
      return;
    }
  
    data[bookIndex].title = req.body.title;
    data[bookIndex].author = req.body.author;
    saveData();
  
    res.status(200).json({
      message: "Book updated",
      book: data[bookIndex]
    });
  }

  

  function deleteBooks(req, res) {
    const id = req.params.id;
    const bookIndex = data.findIndex(book => book.id === id);
  
    if (bookIndex === -1) {
      res.status(404).send("Book not found");
      return;
    }
  
    data.splice(bookIndex, 1);
    saveData();
  
    res.status(204).send();
  }



  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });