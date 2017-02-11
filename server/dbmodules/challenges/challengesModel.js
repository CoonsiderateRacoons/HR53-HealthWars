var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({

  user: {
    type: String,
    required: true
  },

  invited: {
    type: [String],
    required: true
  },

  exercise: {
    type: String,
    required: true
  },

  time: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model( 'Challenge', challengeSchema);