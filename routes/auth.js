const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../config/jwt');
const { 
  generateTwoFactorSecret, 
  generateQRCode, 
  verifyTwoFactorToken 
} = require('../utils/twoFactorAuth');


router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const hashedPassword = await hashPassword(password);
    const twoFASecret = generateTwoFactorSecret();
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, twofa_secret) VALUES (?, ?, ?)', 
      [username, hashedPassword, twoFASecret.base32]
    );
    
    const qrCodeUrl = await generateQRCode(twoFASecret);
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      qrCode: qrCodeUrl,
      userId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password, twoFactorToken } = req.body;

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?', 
      [username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];

    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isTokenValid = verifyTwoFactorToken(user.twofa_secret, twoFactorToken);
    
    if (!isTokenValid) {
      return res.status(401).json({ error: 'Invalid 2FA token' });
    }

    const token = generateToken(user);
    
    res.json({ 
      message: 'Login successful', 
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;