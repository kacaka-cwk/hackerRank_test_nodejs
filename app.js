const express = require('express'); // Import the Express module
const app = express(); // Initialize an Express application
const PORT = 3000; // Define the port number

let answer = 42;

// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Hello World! This is a simple API response.');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


