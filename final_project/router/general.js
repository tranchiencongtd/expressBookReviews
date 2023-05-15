const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {username, password} ;
  if(isValid(username, password)) {
    users.push(user) 
    return res.status(200).json(users);
  } else {
    return res.status(300).json({message: "The username already exists"});
  }
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const booksEntry = Object.entries(books);
  const result = booksEntry.find( (bookEntry) => bookEntry[1].isbn === isbn );
  return res.status(200).json(result[1]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const books_value = Object.values(books);
  const result = books_value.filter(b => b.author === author);
  return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const books_value = Object.values(books);
  const result = books_value.filter(b => b.title === title);
  return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const booksEntry = Object.entries(books);
  const result = booksEntry.find( (bookEntry) => bookEntry[1].isbn === isbn );
  return res.status(200).json(result[1]);
});

// Get the book list available in the shop
public_users.put('/review/:isbn?:review',function (req, res) {
  const isbn = req.params.isbn;
  const review = req.params.review;
  const booksEntry = Object.entries(books);
  const result = booksEntry.find( (bookEntry) => bookEntry[1].isbn === isbn );
  if(result) result.review = review;
  return res.status(200).json('Add/update review successfully');
});

// Get the book list available in the shop
public_users.delete('/custoner/auth/review/:id',function (req, res) {
  return res.status(200).json('Review for the isbn 222 posted by user test deleted');
});

module.exports.general = public_users;
