const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Test route
app.get('/', (req, res) => {
	res.send('Contact Manager API is running!');
});

app.use('/api/contacts', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
