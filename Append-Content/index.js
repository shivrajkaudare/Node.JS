const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML file for user input
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/append", (req, res) => {
  const { file1, file2 } = req.body;

  // Read content from file1
  fs.readFile(file1, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file1");
    }

    // Append content to file2
    fs.appendFile(file2, data, (err) => {
      if (err) {
        return res.status(500).send("Error appending to file2");
      }
      res.send("Content from file1 appended to file2 successfully!");
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
