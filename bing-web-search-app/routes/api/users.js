const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sequelize = require('../../db/db').sequelize;

// Passport init
const passport = require('passport');
// User model init
const User = require('../../db/db').user;

// Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// Passport middleware
router.use(passport.initialize());
// Passport config
require('../../config/passport')(passport);

// @route GET /api/users/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({
    msg: 'User works'
})); //trimit json

// @route POST /register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

    User.findOne( {where: {email: req.body.email}})
      .then(user => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          User.create({
            email: req.body.email,
            userType: req.body.userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
          })
          .then(user => {
            res.status(200).json(user);
          })
          .catch(err => (res.status(500).send(err)));
        }
      })
  })
  
  // @route POST /login
  // @desc Log in user
  // @access Public
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const { errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({where: {email:req.body.email}})
      .then( user => {
        if (!user) {
          errors.email = 'User not found'
          return res.status(404).json(errors);
        }
        User.findOne({ where: { email: req.body.email, password: req.body.password }})
        .then( user => {
          const payload = { email : user.email, firstName: user.firstName, lastName: user.lastName }
          const secretOrKey = 'secret';
  
          //Sign Token
          jwt.sign(payload,
             secretOrKey,
             {expiresIn:  7200},
             (err, token) => {
               res.status(200).json({
                 success: true,
                 token: 'Bearer ' + token
               })
  
          }); //payload ce e in token (user info) cand ajunge in server trebuie sa fie decodat ca sa stie ce user e, expiration daca vreau sa expire
        })
        .catch( () => res.status(500).json({password: 'Password incorrect'}));
    })  
  });
  
  // @route GET api/users/current
  // @desc Return current user
  // @access Private
  router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.body.lastName 
    });
  })
 module.exports = router;