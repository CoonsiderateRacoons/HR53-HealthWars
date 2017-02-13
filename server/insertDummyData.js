var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/healthwars');

var Round = require('./dbmodules/rounds/roundModel.js');
var User = require('./dbmodules/users/userModel.js');
var Exercise = require('./dbmodules/exercises/exerciseModel.js');
var Achievement = require('./dbmodules/achievement/achievementModel.js');
var Challenge = require('./dbmodules/challenges/challengesModel.js');

// Stub rounds data

var achData = require('./dummyData/achievements.json');
var exData = require('./dummyData/exercises.json');
var rdData = require('./dummyData/rounds.json');
var usrData = require('./dummyData/users.json');
var chlData = require('./dummyData/challenges.json');

var insertData = function() {

  rdData.forEach(function(rd) {
    Round.create(rd, function(err, created) {
      if (err) {
        console.log(err);
      }
      console.log('Round saved to DB!');
    });
  });

  exData.forEach(function(ex) {
    Exercise.create(ex, function(err, created) {
      if (err) {
        console.log(err);
      }
      console.log('Exercise saved to DB!');
    });
  });

  achData.forEach(function(ach) {
    Achievement.create(ach, function(err, created) {
      if (err) {
        console.log(err);
      }
      console.log('Achievement saved to DB!');
    });
  });

  usrData.forEach(function(usr) {
    User.create(usr, function(err, created) {
      if (err) {
        console.log(err);
      }
      console.log('User saved to DB!');
    });
  });

  chlData.forEach(function(chl) {
    Challenge.create(chl, function(err, created) {
      if (err) {
        console.log(err);
      }
      console.log('Challenge saved to DB!');
    });
  });

};

insertData();