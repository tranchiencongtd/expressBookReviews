const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.filter(u => u.username === username).length <= 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.filter(u => u.username === username && u.password === password).length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if( authenticatedUser(username, password) ) return res.status(200).json({message: "Login successfully!"});
  else return res.status(300).json({message: "Login fail"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
