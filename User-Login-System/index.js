const express = require("express");

const bodyParser = require("body-parser");

const session = require("express-session");

const app = express();

const port = 3000;

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret_key", // Change this to a random string

    resave: false,

    saveUninitialized: true,
  })
);

// In-memory user database (Replace this with a real database in production)

const users = [
  { id: 1, username: "user1", password: "password1" },

  { id: 2, username: "user2", password: "password2" },
];

// Routes

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Login route

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.session.userId = user.id;

    res.send("Login successful!");
  } else {
    res.send("Invalid username or password.");
  }
});

// Logout route

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }

    res.redirect("/");
  });
});

// Protected route (requires login)

app.get("/profile", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/");
  }

  const user = users.find((u) => u.id === req.session.userId);

  if (!user) {
    return res.send("User not found.");
  }

  res.send(`Welcome, ${user.username}! <br><a href="/logout">Logout</a>`);
});

// Start the server

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
