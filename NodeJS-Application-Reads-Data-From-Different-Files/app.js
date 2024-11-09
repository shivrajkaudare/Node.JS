const fs = require('fs').promises;
const path = require('path');

// Function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Function to read multiple files asynchronously
async function readMultipleFiles(filePaths) {
  try {
    const validFilePaths = [];

    // Check each file's existence
    for (const filePath of filePaths) {
      const exists = await fileExists(filePath);
      if (exists) {
        validFilePaths.push(filePath);
      } else {
        console.warn(`Warning: File "${filePath}" does not exist.`);
      }
    }

    if (validFilePaths.length === 0) {
      console.log("No valid files to read.");
      return;
    }

    // Read all valid files concurrently
    const filePromises = validFilePaths.map((filePath) => fs.readFile(filePath, 'utf8'));
    const fileContents = await Promise.all(filePromises);

    // Output each file's content with improved formatting
    fileContents.forEach((content, index) => {
      console.log(`\nContent of "${validFilePaths[index]}":`);
      console.log("--------------------------------------------------");
      console.log(content);
      console.log("--------------------------------------------------\n");
    });
  } catch (error) {
    console.error("Error reading files:", error);
  }
}

// Get file names from command-line arguments
const filesToRead = process.argv.slice(2);

if (filesToRead.length === 0) {
  console.log("Please provide file names as command-line arguments.");
} else {
  // Call the function
  readMultipleFiles(filesToRead);
}
