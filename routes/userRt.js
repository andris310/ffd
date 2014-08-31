var express = require('express');
var router = express.Router();
var User = require('../models/userMdl');
var passport = require('passport');

require('../ffd_modules/connection').db();

// router.get('/register', function(req, res) {
//   res.render('register', { });
// });

// router.post('/register', function(req, res) {
//   User.register(new User({username : req.body.username }), req.body.password, function(err, user) {
//     if (err) {
//       return res.render('register', {
//         info: 'Sorry. That username already exists. Try again.'
//       });
//     }

//     passport.authenticate('local')(req, res, function() {
//       res.redirect('/');
//     });
//   });
// });

router.get('/login', function(req, res) {
  res.render('login', {
    user : req.user,
    alias: 'login'
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;
