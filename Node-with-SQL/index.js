// require MY SQL pakage
const mysql = require("mysql2");

// creating connection of node with my sql. i.e. // Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user_data",
  password: "Shivraj1234",
});

// Insert New data into table.
// ? - this is placeholders
let q = "INSERT INTO user (id, username, email, password) VALUES ? ";
// Insert single user
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];
// Insert multiple users.
let users = [
  ["124", "124_shiv", "abcd@gmail.com", "shsj"],
  ["125", "125_raj", "raj@gmail.com", "assl"],
];

try {
  connection.query(q, /*user*/ [users], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  // ----- OR ------
  // try {
  //   connection.query("SHOW TABLES", (err, result) => {
  //     if (err) throw err;
  //     console.log(result);
  //   });
} catch (err) {
  console.log(err);
}
connection.end();

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
