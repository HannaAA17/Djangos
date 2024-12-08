const express = require("express");
let books = require("./booksdb.js");
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Function to check if the user exists
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res
    .status(404)
    .json({ message: "Unable to register user." + username + password });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  if (isbn in books) {
    return res.status(200).json({ [isbn]: books[isbn] });
  } else {
    return res.status(404).json({ message: "error: book not found" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books);
  const filtered_keys = keys.filter((key) => books[key].author === author);
  const filtered_books = filtered_keys.reduce(
    (tmp_obj, key) => ((tmp_obj[key] = books[key]), tmp_obj),
    {}
  );

  if (filtered_keys.length) {
    return res.status(200).send(filtered_books);
  } else {
    return res.status(404).json({ message: "error: book not found" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);

  const filtered_keys = keys.filter((key) => books[key].title === title);
  const filtered_books = filtered_keys.reduce(
    (tmp_obj, key) => ((tmp_obj[key] = books[key]), tmp_obj),
    {}
  );

  if (filtered_keys.length) {
    return res.status(200).send(filtered_books);
  } else {
    return res.status(404).json({ message: "error: book not found" });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  if (isbn in books) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "error: book not found" });
  }
});

module.exports.general = public_users;
