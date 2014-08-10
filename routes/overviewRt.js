var async = require('async');
var express = require('express');
var router = express.Router();
var Furniture = require('../models/furnitureMdl');
var Designer = require('../models/designerMdl');
require('../ffd_modules/connection').db();

router.get('/overview-panel', function(req, res) {
  var furnitureList, designers;

  var parallels = {};

  parallels.furniture = function(callback) {
    Furniture.find(function(err, furnitures) {
      if (err) {
        return callback(err);
      }

      callback(null, furnitures);
    });
  };

  parallels.designers = function(callback) {
    Designer.find(function(err, designers) {
      if (err) {
        return callback(err);
      }

      callback(null, designers);
    });
  };

  async.parallel(parallels, function(err, results) {
    if (err) {
      return res.code(500, err);
    }

    res.render('overview_panel', {
      furniture: results.furniture,
      designers: results.designers
    });
  });
});

module.exports = router;