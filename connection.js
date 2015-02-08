var mongoose = require('mongoose');
var dbConfig = require('../config/db');

mongoose.connect(dbConfig.url);
var db;

exports.db = function() {
  if (db === null) {
    db = mongoose.connection;
  }
  return db;
};
