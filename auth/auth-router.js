const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
// Requiring secrets, then we can put in our function below 
const secrets = require('../config/secrets.js'); 

// We need to require jsonwebtoken, after npm install 
const jwt = require('jsonwebtoken'); 

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // When using tokens, we need to manually generate and send token as part of response
        const token = generateToken(user); 

        res.status(200).json({
          // After token generated, we have to add to response 
          message: `Welcome ${user.username}!`, token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  // Defining payload, containing claims (info) for token 
  const payload = {
    subject: user.id, // Standard claim = sub
    
    username: user.username, // Both of these are just data 
    roles: ['student'] // Faking this with a string for now; can add any data 
  }

  const options = {
    expiresIn: '1d' // Good for one day
  }


  // Grabs the jwtSecret to verify token 
  return jwt.sign(payload, secrets.jwtSecret, options); // returns a token
}

module.exports = router;
