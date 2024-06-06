const { faker } = require("@faker-js/faker");

// require MY SQL pakage
const mysql = require("mysql");

// creating connection of node with my sql. i.e. // Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "user_data",
  password: "Shivraj1234",
});
try {
  connection.query("SHOW TABLE", (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
