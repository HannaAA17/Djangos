const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};

const isValid = (username) => {
  //returns boolean
  return username && doesExist(username);
};

//Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  //returns boolean
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });

  return validusers.length > 0;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "username and/or password are not provided" });
  }

  if (!isValid(username)) {
    return res
      .status(404)
      .json({ message: "username doesn't exist, please register" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });

    req.session.authorization = { accessToken, username };

    return res
      .status(200)
      .json({ message: `User '${username}' successfully logged in` });
  }

  return res
    .status(208)
    .json({ message: "Invalid Login. Check username and password" });
});

// check if logged in
regd_users.get("/auth/me", (req, res) => {
  const username = req.session.authorization["username"];
  return res.status(200).json({
    message: `Hello ${username}, You are an authenticated user. Congratulations!`,
  });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization["username"];

  if (!(isbn in books)) {
    return res.status(404).json({ message: "error: book not found" });
  } else if (!review) {
    return res.status(404).json({ message: "review is not provided" });
  } else {
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "review added successfully" });
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization["username"];

  if (!(isbn in books)) {
    return res.status(404).json({ message: "error: book not found" });
  } else if (!(username in books[isbn].reviews)) {
    return res.status(404).json({ message: "error: review not found" });
  } else {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "review removed successfully" });
  }
});

module.exports.authenticated = regd_users;
module.exports.doesExist = doesExist;
module.exports.users = users;
