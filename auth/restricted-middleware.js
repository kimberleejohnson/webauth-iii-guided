// Can remove bcrypt and Users library because no longer need 

// Require jwt library so we can verify token
const jwt = require('jsonwebtoken');

// Require secrets so secrets can also be decoded
const secrets = require('../config/secrets.js'); 


module.exports = (req, res, next) => {

  // Eventually we want to change headers to check for tokens 
  // Not reading from headers so can delete 
  // Token often attached to headers 
  const token = req.headers.authorization; 

  // Check if there is a token 
  if (token) {

    // Verify method verifies token, decodes secret, and also pass in a function
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if(err) {
        // Invalid token 
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        // Valid token 
        next(); 
      }
    }); 
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};
