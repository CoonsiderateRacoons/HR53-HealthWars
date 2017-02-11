var webpackConfig = require('../webpack.config');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
// Jared change
var passport = require('passport');

var compiler = webpack(webpackConfig);
var app = express();


app.use(require("webpack-hot-middleware")(compiler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(express.static('public'));


// ================================
// DATA API ENDPOINT ROUTING
// ================================

// Controller Dependencies

var userController = require('./dbmodules/users/userController');
var roundController = require('./dbmodules/rounds/roundController');
var exerciseController = require('./dbmodules/exercises/exerciseController');
var achievementController = require('./dbmodules/achievement/achievementController');

// === USER ROUTING === (SESSIONS SHOULD STORE A USER'S '_id' VALUE FROM MONGO)

app.get('/api/users/signin', userController.signin);


// Get all users
app.get('/api/users', userController.getUsers);

// Add a new user (see schema for fields)
app.post('/api/users', userController.newUser);

// Add an achievement to a user
app.post('/api/users/:username/achievements', userController.addAchievement);

// Get a single user's data (using Mongo ID)
app.get('/api/users/:username', userController.getUser);

// Update a user's scores (requres the entire edited array be sent through in request)
// Scores array, pre-edit, can be acquired via getting a single user's full data (see above route)
app.post('/api/users/:username/scores', userController.updateScores);

// Tell DB a new round has started: update all users' scores array
app.post('/api/users/newround', userController.addRound);

// === ACHIEVEMENT ROUTING ===

// Get all achievements from DB
app.get('/api/achievements', achievementController.getAchievements);

// Create a new achievement (see schema for fields)
app.post('/api/achievements', achievementController.newAchievement);

// === ROUND ROUTING ===
// Example of rounds would be 'week 1, week 2, week 3...'

// Get all rounds data existing in DB
app.get('/api/rounds', roundController.getRounds);

// Add data for a new round (see schema)
app.post('/api/rounds', roundController.newRound);

// === EXERCISE ROUTING ===

// Get all available exercises from DB
app.get('/api/exercises', exerciseController.getExercises);

// Create a new exercise (see schema for necessary fields)
app.post('/api/exercises', exerciseController.newExercise);


app.post('/submitUnits', function(req, res) {
  console.log('POST request received on url submitUnits');
  console.log('body', req.body); //TODO: move data to DB
  res.end('');
});

module.exports = app;
