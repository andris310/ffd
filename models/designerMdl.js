var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var designerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Designer', designerSchema);