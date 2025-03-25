// routes/products.js
const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticateJWT } = require('../middleware/auth');

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
      [name, description, price, quantity]
    );
    
    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const [products] = await pool.execute('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const [products] = await pool.execute(
      'SELECT * FROM products WHERE id = ?', 
      [req.params.id]
    );
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?',
      [name, description, price, quantity, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?', 
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;