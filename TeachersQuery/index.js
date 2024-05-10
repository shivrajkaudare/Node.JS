// teacherQuery.js

const mysql = require("mysql");

// Create a connection to the database

const connection = mysql.createConnection({
  host: "localhost",

  user: "your_username",

  password: "your_password",

  database: "your_database",
});

// Connect to the database

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);

    return;
  }

  console.log("Connected to database");
});

// Select all records from the Teacher table where salary is greater than 20,000

const sqlQuery = "SELECT * FROM Teacher WHERE salary > 20000";

// Execute the SQL query

connection.query(sqlQuery, (err, results) => {
  if (err) {
    console.error("Error executing query:", err);

    return;
  }

  console.log("Teachers with salary greater than 20,000:");

  console.log(results);
});

// Close the connection

connection.end();
