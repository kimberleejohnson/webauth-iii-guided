const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

// Requiring checkRole middleware
const checkRole = require('../auth/checkRole.js'); 

// Check role will make sure the person has the right role to see the users
router.get('/', restricted, checkRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({users, user: req.user});
    })
    .catch(err => res.send(err));
});

module.exports = router;
