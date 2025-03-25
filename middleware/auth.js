const { verifyToken } = require('../config/jwt');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ error: 'Authorization token required' });
  }
}

module.exports = {
  authenticateJWT
};