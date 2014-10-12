var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('./../models/account');
var fs = require('fs');
var crypto = require("crypto");
var otherSchemas = require('./../models/otherSchemas');
var tokenSchemas = require('./../models/tokenSchemas');


exports.registerPostReq = function(req, res) {
	  
	  var accountData;
					 
	  accountData = new Account({
		   firstname : req.body.fname,
		   lastname : req.body.lname,
		   username : req.body.username, 
		   email : req.body.email, 
		   phone : req.body.phone
	  })
	 
	  
	  Account.register(accountData, req.body.password, function(err, account) {
		  if (err) {
			  console.log(err)
			return res.send({status: 'danger', msg: 'Username already exists!'});
		  }
  
		  passport.authenticate('local')(req, res, function () {
			
			   return res.send({status: 'success', msg: 'Created'});

		  });
	  });
	  
	  
  };

  /**
   *
   * For User verification, Leave this for now. I will explain this in future
   *
   */

exports.verify = function (req, res, next) {
    var token = req.params[0];
    
    verifyUser(token, res, function(err) {
        if (err) return res.render("verification-failure");
        res.render("verification-success");
    
    });
};

  /**
   *
   * For User verification, Leave this for now. I will explain this in future
   *
   */

function verifyUser(token, res, done) {
	
	var verificationtoken = tokenSchemas.verificationtoken
	
    verificationtoken.findOne({token: token}, function (err, doc){
        if (err) return done(err);
        if(!doc) return res.render("verification-failure");
        
        Account.findOne({_id: doc.user}, function (err, user) {
            if (err) return done(err);
            if (!user) return res.render("verification-failure");
            
            user["accountVerified"] = 'Yes';
            user.save(function(err) {
                done(err);
            })
        })
    })
}
