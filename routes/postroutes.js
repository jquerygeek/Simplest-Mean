/**
 *
 * These are the handler functions which deliver REST API POST Routes for application
 *
 *
 */

var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('./../models/account');
var fs = require('fs');
var crypto = require("crypto");
var otherSchemas = require('./../models/otherSchemas');
var tokenSchemas = require('./../models/tokenSchemas');

var html_dir = './public/';

  
exports.forgotPasswordEmailRequest = function(req, res) {
	  if (typeof req.user != 'undefined') res.redirect('/');
      else{ 
		  
		  // Your logic goes here. I might put my logic here in future

	  }
  };
  

exports.changePasswordRoute = function(req, res){
	  if (typeof req.user != 'undefined') res.redirect('/');
      else{ 
	    
	    // Your logic goes here. I might put my logic here in future

	  }
  };
