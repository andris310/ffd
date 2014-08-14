var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design',
    alias: 'home',
    user : req.user
  });
});

module.exports = router;