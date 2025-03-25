const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    { expiresIn: '10m' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};