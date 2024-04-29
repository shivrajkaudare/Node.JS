  // this file name always index.js and this file exports data from all files .

    const banana = require("./banan");
    const greps = require("./greps");
    const mango = require("./mango");

  const fruits = [banana, greps, mango];

  module.exports = fruits;