// Require faker package.
const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");
// creating connection with database.
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user_data",
  password: "Shivraj1234",
});

// function for generating random user data which return array .

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// query for inserting data into database.
let q = "INSERT INTO user (id, username, email, password) VALUES ?";

let data = [];
for (let i = 1; i <= 100; i++) {
  data.push(getRandomUser()); // 100 random user data / fake data.
}

// storing data to the DB.
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

connection.end();
