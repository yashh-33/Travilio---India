import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token provided, authorization denied.' });
  }

  // Expecting "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Token format must be Bearer <token>' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'travilio_production_secure_signing_key_2026');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid or has expired.' });
  }
};

export default authMiddleware;
