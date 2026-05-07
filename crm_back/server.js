const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

app.get('/', (req, res) => {
  res.send('CRM API is running...');
});

app.get('/', (req, res) => {
  res.send('Hello from the CRM backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
