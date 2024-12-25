const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Import the 'fs' module for file operations
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());  // Allow cross-origin requests

// POST route to handle form submissions
app.post('/', (req, res) => {
    const { name, email, message, timestamp } = req.body;

    // Log the incoming form data
    console.log('Received form data:', { name, email, message, timestamp });

    // Prepare the data to be saved (as an object)
    const formData = { name, email, message, timestamp };

    // Read the existing data from the file (if it exists)
    fs.readFile('data.json', (err, data) => {
        let savedData = [];

        // If there's an error reading the file (e.g., file doesn't exist), create an empty array
        if (err) {
            console.log('No previous data file found, creating new one...');
        } else {
            savedData = JSON.parse(data); // Parse the existing JSON data
        }

        // Add the new form data to the saved data
        savedData.push(formData);

        // Write the updated data back to the file
        fs.writeFile('data.json', JSON.stringify(savedData, null, 2), (err) => {
            if (err) {
                console.error('Error saving data to file:', err);
                return res.status(500).json({ status: 'error', message: 'Failed to save data' });
            }

            console.log('Form data saved to data.json');
            res.json({ status: 'success', message: 'Form submitted successfully' });
        });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
