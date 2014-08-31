var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design',
    metaDescription: 'Collection of most notable and famous furniture design and their designers.',
    alias: 'home',
    user : req.user
  });
});

module.exports = router;