var Accepted = require('./acceptedModel.js');
var Q = require('q');

var findAcccepted = Q.nbind(Accepted.findOne, Accepted);
var createAccepted = Q.nbind(Accepted.create, Accepted);
var findAccepteds = Q.nbind(Accepted.find, Accepted);

module.exports = {

  newAccepted : function(req, res, next) {
    return createAccepted(req.body)
    .then(function(Accepted) {
      if (Accepted) {
        res.json(Accepted);
      } 
      next();
    }).fail(function(err){
      next(err);
    });
  },

  getAccepteds : function(req, res, next) {
    console.log('currentUser name: ', req.params.user)
    return findAccepteds({invited: req.params.user})
    .then(function(Accepteds){
      if(Accepteds) {
        res.json(Accepteds);
      }
      next();
    }).fail(function(err){
      next(err);
    });
  }

};