/**
 *
 * These are the handler functions which deliver views for application
 *
 * Note: I am using JADE Templates
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

exports.indexRoute = function (req, res) {
	  if (typeof req.user == 'undefined')
	      res.render('index', { title: 'My Application'});
      else{
		
		res.redirect('/home');
      }
  };
  
exports.homeRoute = function (req, res) {

	  if (typeof req.user == 'undefined')
	      res.redirect('/')
      else{
		
			Account.findById(req.user._id, function (err, gotUser) {
				if (err) return console.log(err);
				
				res.render('home', { title: 'My Application', user: gotUser});
    		  
		    })
		
      }

  };

  /**
   *
   * Leave this for now, I would explain its use in future
   *
   */
  
exports.resetPasswordViewRoute = function(req, res){
	  if (typeof req.user != 'undefined') res.redirect('/');
      else{ 
	    
	    var token = req.params[0];
		  
		var passwordresettoken = tokenSchemas.passwordresettoken
	
		passwordresettoken.findOne({token: token}, function (err, doc){
			if (err) return done(err);
			if(!doc) return res.render("passwordreset-failure");
			
			res.render('newpassword', { title: 'My Application', token : token });
		
		})

	  }
  };

exports.loginViewRoute = function(req, res) {
	if (typeof req.user == 'undefined')
		res.render('login', { title: 'My Application'});
	else
		res.redirect('/home');
  };
  
exports.registerViewRoute = function(req, res) {
	if (typeof req.user == 'undefined')
		res.render('register', { title: 'My Application'});
	else
		res.redirect('/home');
  };
  
exports.forgotPasswordViewRoute = function(req, res) {
	if (typeof req.user == 'undefined')
		res.render('forgotpassword', { title: 'My Application'});
	else
		res.redirect('/home');
  };
