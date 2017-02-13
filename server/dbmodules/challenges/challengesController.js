var Challenge = require('./challengesModel.js');
var Q = require('q');
var axios = require('axios');
// var nodemailer = require('nodemailer')

var findChallenge = Q.nbind(Challenge.findOne, Challenge);
var createChallenge = Q.nbind(Challenge.create, Challenge);
var findChallenges = Q.nbind(Challenge.find, Challenge);

module.exports = {

  newChallenge : function(req, res, next) {
    return createChallenge(req.body)
    .then(function(challenge) {
      if (challenge) {
        res.json(challenge);
      } 
      next();
    }).fail(function(err){
      next(err);
    });
  },

  getChallenges : function(req, res, next) {
    console.log('currentUser name: ', req.params.user)
    return findChallenges({invited: req.params.user})
    .then(function(challenges){
      if(challenges) {
        res.json(challenges);
      }
      next();
    }).fail(function(err){
      next(err);
    });
  },

  getUserChallenges : function(req, res, next) {
    console.log('currentUser name: ', req.params.user)
    return findChallenges({user: req.params.user})
    .then(function(challenges){
      if(challenges) {
        res.json(challenges);
      }
      next();
    }).fail(function(err){
      next(err);
    });
  },

  deleteChallenge : function(req, res, next) {
    return findChallenge(req.body).remove().exec()
    .then(function(challenge) {
      if (challenge) {
        res.json(challenge);
      } 
      next();
    }).fail(function(err){
      next(err);
    });
  }


};