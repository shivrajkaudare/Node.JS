// require faker package
const { faker } = require("@faker-js/faker");
// require mysql2 package
const mysql = require("mysql2");

const express = require("express");
const app = express();
exports.app = app;
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// create connection to the database.
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user_data",
  password: "Shivraj1234",
});

// function which generating random / fake user data whicj return array.
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// ends SQL connection

// Home Route :
// GET Method- route- "/" - Fetch and show total number of users on our app.
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database.");
  }
});

// Show Route
// GET method - Route -"/user" - Fetch and show (userId,username, email) of all users.
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;

  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    res.send("Some error in DB.");
  }
});

// Edit Route.
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    res.send("error in DB");
  }
});

// UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id ="${id}"`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass === user.password) {
        let q2 = `UPDATE user SET username="${newUsername}" WHERE id="${id}"`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/user");
        });
      } else {
        res.send("wrong password");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Error in DB");
  }
});

let port = "8080";
app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
