var webpackConfig = require('../webpack.config');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
// Jared change
var passport = require('passport');
var nodemailer = require('nodemailer');

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
var challengesController = require('./dbmodules/challenges/challengesController')
var acceptedController = require('./dbmodules/accepted/acceptedController')

// === USER ROUTING === (SESSIONS SHOULD STORE A USER'S '_id' VALUE FROM MONGO)

// console.log('inside signin route', req.body);
app.post('/api/signin', userController.signin);


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


// === CHALLENGES ROUTING ===

app.get('/api/challenges/:user/', challengesController.getChallenges);

app.get('/api/challenges/userChallenges/:user/', challengesController.getUserChallenges);

app.get('/api/challenges/delete/', challengesController.deleteChallenge);

app.post('/api/challenges', challengesController.newChallenge);

// === ACCEPTED ROUTING ===

app.get('/api/accepted/:user/', acceptedController.getAccepteds);

app.post('/api/accepted', acceptedController.newAccepted);

// === EMAIL ROUTING ===

app.post('/email', function(req, res) {
	var temp = req.url.split('=');
	var email = temp[1];
	
	let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'CoonsiderateRacoons@gmail.com',
      pass: 'HR4Life!'
    }
	});

	// setup email data with unicode symbols
	let mailOptions = {
    from: '"HealthWars" <CoonsiderateRacoons@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'You have been challeneged in HealthWars!', // Subject line
    text: 'Accept or deny the challenge on HealthWars to determine your fate!', // plain text body
    html: 'Accept or deny the challenge on HealthWars to determine your fate!' // html body
	};
	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});

	res.end();
})


module.exports = app;
