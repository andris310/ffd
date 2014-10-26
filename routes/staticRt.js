var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design',
    metaDescription: 'A quick guide to some of the most famous furniture designs and designers that created these peaces of art. Most of the furniture featured on this site was created arround mid 20th century. They stand through time and their design has become iconic.',
    alias: 'home',
    user : req.user
  });
});

router.get('/sitemap.xml', function(req, res) {
  fs.readFile(path.resolve(__dirname, '../views/sitemap.xml'), function(err, data) {
    if (err) {
      throw err;
    }
    res.header('Content-Type', 'application/xml');
    res.send(data);
  });
});

module.exports = router;