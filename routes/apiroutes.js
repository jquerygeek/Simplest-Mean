/**
 *
 * These are the handler functions which deliver REST API Routes for application
 *
 * Note: I will move the log out route from here to other file
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
  
exports.logoutRoute = function(req, res) {
      req.logout();
      res.redirect('/');
  };
  
exports.getUserData = function(req, res) {
    if (typeof req.user == 'undefined') res.send({status: 'danger', msg: 'Unauthorized Access!'});
    else{
      		Account.findById(req.user._id, function (err, gotUser) {
      			if (err) return console.log(err);
      			
      			res.send({status: 'success', msg: gotUser});
      			
      		})
      }
  };
