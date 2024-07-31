// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const path = require('path');
const basicAuth = require('express-basic-auth');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Set the port to 3000 or use the environment's port
const dbPath = path.join(__dirname, 'data', 'submissions.json'); // Path to the JSON file

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory where the view files are located
app.set('views', path.join(__dirname, 'views'));

// Basic authentication middleware for the /dashboard route
app.use('/dashboard', basicAuth({
    users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASS }, // Use environment variables for credentials
    challenge: true, // This will cause the browser to prompt the user for credentials
    unauthorizedResponse: (req) => 'Unauthorized' // Custom message for unauthorized users
}));

// Route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body; // Extract form data from the request body
    const newSubmission = { name, email, message }; // Create a new submission object

    // Read the current submissions from the JSON file
    jsonfile.readFile(dbPath, (err, data) => {
        if (err || !data || !Array.isArray(data.submissions)) {
            data = { submissions: [] }; // Initialize with an empty array if the file doesn't exist or is invalid
        }

        data.submissions.push(newSubmission); // Add the new submission to the array

        // Write the updated data back to the JSON file
        jsonfile.writeFile(dbPath, data, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to save submission' }); // Send an error response if writing fails
            }
            res.json({ message: 'Form submitted successfully!' }); // Send a success response
        });
    });
});

// Route to render the dashboard
app.get('/dashboard', (req, res) => {
    // Read the current submissions from the JSON file
    jsonfile.readFile(dbPath, (err, data) => {
        if (err || !data || !Array.isArray(data.submissions)) {
            return res.status(500).send('Failed to read database'); // Send an error response if reading fails or data is invalid
        }

        res.render('dashboard', { submissions: data.submissions }); // Render the 'dashboard' view with the submissions data
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log a message when the server starts
});
