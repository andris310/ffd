var express = require('express');
var router = express.Router();
var Furniture = require('../models/furniture');

var mongoose = require('mongoose');
var dbConfig = require('../config/db');
mongoose.connect(dbConfig.url);
var db = mongoose.connection;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', {
    title: 'Famous Furniture Design'
  });
});

router.get('/furniture', function(req, res) {
  Furniture.find(function(err, furnitures) {
    if (err) {
      res.send(err);
      return;
    }

    res.render('furniture', {
      furniture: furnitures
    });
  });
});


router.get('/new-furniture', function(req, res) {
  res.render('new_furniture', {
    title: 'New Furniture'
  });
});

router.post('/add-furniture', function(req, res) {
  var furniture = new Furniture();

  furniture.name = req.body.name;
  furniture.designer = req.body.designer;
  furniture.year = req.body.year;
  furniture.description = req.body.description;

  furniture.save(function(err) {
    if (err) {
      res.send('There was a problem adding information to the database.');
      return;
    }

    res.location('furniture');
    res.redirect('furniture');
  });
});

router.delete('/destroy-furniture/:furniture_id', function(req, res) {
  var furniture = new Furniture();
  console.log('ID........' + req.params.furniture_id)
  Furniture.remove({
    id: req.params.furniture_id
  }, function(err, furniture) {
    if (err) {
      res.send(err);
      return;
    }

    res.location('furniture');
    res.redirect('furniture');
  });
});

router.get('/designers', function(req, res) {
  res.render('furniture', {
    title: 'Designers'
  });
});

module.exports = router;