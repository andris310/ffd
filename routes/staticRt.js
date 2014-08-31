var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design',
    metaDescription: 'A quick guide to some of the most famous furniture designs and designers that created these peaces of art. Most of the furniture featured on this site was created arround mid 20th century. They stand through time and their design has become iconic.',
    alias: 'home',
    user : req.user
  });
});

module.exports = router;