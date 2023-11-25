const jwt = require('jsonwebtoken');

// Define your JWT secret here
const jwtSecret = 'voyagevistasecretkey';

module.exports = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('x-auth-token');

  // Check if there's no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, jwtSecret);

    // Set req.user with the decoded user information
    req.user = decoded.user;
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};