const express = require('express');
const fs = require('fs');
// const moment = require('moment');
const path = require('path');
const app = express();

app.post('/create-file', (req, res) => {
  const folderPath = "./files";
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const fileName = `${year}-${month}-${day}T${hours}-${minutes}-${seconds}.txt`; // Generate a file name with the current date and time
  const filePath = `${folderPath}/${fileName}`;
  // Use the fs.writeFile method to create the file in the folder
  const timestamp = new Date().toString();

  fs.writeFile(filePath, timestamp, function (err) {
    if (err) {
      // If there is an error, return a 500 status code and error message
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the file." });
    }

    // If the file is successfully created, return a 200 status code and success message
    return res.status(200).json({ message: "File successfully created." });
  });
});

// API endpoint to retrieve all text files:

app.get("/get-files", (req, res) => {
  const folderPath = "./getfiles";

  // Use the fs.readdir method to read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      // If there is an error, return a 500 status code and error message
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the files." });
    }

    // Use the path.extname method to filter out any non-text files
    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    // Return a JSON response with the array of text file names
            console.log(textFiles);

      return res.status(200).json({ files: textFiles });
      
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
