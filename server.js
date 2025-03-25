// server.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const { initDatabase } = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});