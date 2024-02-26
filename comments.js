// Create web server

// Import the express module
const express = require("express");
// Create an express application
const app = express();
// Import the file system module
const fs = require("fs");
// Import the body-parser module
const bodyParser = require("body-parser");
// Import the path module
const path = require("path");
// Import the comments.json file
const comments = require("./comments.json");

// Set the port number
const port = 3000;

// Set the static folder
app.use(express.static(path.join(__dirname, "public")));

// Set the body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine
app.set("view engine", "ejs");

// Set the views folder
app.set("views", path.join(__dirname, "views"));

// Set the home route
app.get("/", (req, res) => {
  res.render("index");
});

// Set the comments route
app.get("/comments", (req, res) => {
  res.render("comments", {
    comments: comments,
  });
});

// Set the new comment route
app.get("/new-comment", (req, res) => {
  res.render("new-comment");
});

// Set the post new comment route
app.post("/new-comment", (req, res) => {
  // Create a new comment
  const newComment = {
    comment: req.body.comment,
    name: req.body.name,
  };
  // Add the new comment to the comments array
  comments.push(newComment);
  // Write the comments array to the comments.json file
  fs.writeFile("./comments.json", JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/comments");
    }
  });
});

// Set the delete comment route
app.get("/delete-comment/:id", (req, res) => {
  // Get the id from the request
  const id = req.params.id;
  // Remove the comment from the comments array
  comments.splice(id, 1);
  // Write the comments array to the comments.json file
  fs.writeFile("./comments.json", JSON.stringify(comments), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/comments");
    }
  });
});

// Listen for requests
app.listen(port, () => {
  console.log(`Server is running on