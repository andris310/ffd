var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designerSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  metadescription: {
    type: String
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Designer', designerSchema);