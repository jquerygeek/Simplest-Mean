/**
 *
 * This is the main file for handling routes
 *
 */
 
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('./../models/account');
var fs = require('fs');
var crypto = require("crypto");
var otherSchemas = require('./../models/otherSchemas');
var viewroutes = require('./viewroutes');
var apiroutes = require('./apiroutes');
var postroutes = require('./postroutes');
var registrationroutes = require('./registrationroutes');
var tokenSchemas = require('./../models/tokenSchemas');

var html_dir = './public/';

module.exports = function (app) {
	
  
  //**************************************************************************************************//
  //**************************************************************************************************//
  // Web Application's HTML Views generated from Jade templates                                       //
  //**************************************************************************************************//
  //**************************************************************************************************//
  

  app.get('/', viewroutes.indexRoute);
  
  app.get('/home', viewroutes.homeRoute);
  
  app.get('/login', viewroutes.loginViewRoute);
  
  app.get('/register', viewroutes.registerViewRoute);
  
  app.get('/forgotpassword', viewroutes.forgotPasswordViewRoute);
  
  app.get("/resetpassword/*", viewroutes.resetPasswordViewRoute);
  
  
  //**************************************************************************************************//
  //**************************************************************************************************//
  // REST API Routes (GET METHODS)                                                                    //
  //**************************************************************************************************//
  //**************************************************************************************************//
  
  
  app.get('/getUserData', apiroutes.getUserData);
  
  
  //**************************************************************************************************//
  //**************************************************************************************************//
  // REST API Routes (POST METHODS)                                                                   //
  //**************************************************************************************************//
  //**************************************************************************************************//
  
  
  app.post('/forgotPasswordRequest', postroutes.forgotPasswordEmailRequest);
  
  app.post("/ChangePassword", postroutes.changePasswordRoute);
  
  
  //**************************************************************************************************//
  //**************************************************************************************************//
  // Registration and other routes                                                                    //
  //**************************************************************************************************//
  //**************************************************************************************************//
  
  
  app.post('/register', registrationroutes.registerPostReq);
   
  app.get('/logout', apiroutes.logoutRoute);

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/home');
  });
  
  app.get("/verify/*", registrationroutes.verify);
  
  
  //**************************************************************************************************//
  //**************************************************************************************************//
  // Facebook, Google & MSN Authentication Routes                                                     //
  //**************************************************************************************************//
  //**************************************************************************************************//
  
  
  // Do check the scope, it might not work

  app.get("/auth/facebook", passport.authenticate("facebook", { scope : ['basic_info', 'email']}));

  app.get("/auth/facebook/callback",
      passport.authenticate("facebook",{ failureRedirect: '/'}), 
      function(req,res){

            res.redirect('/home');
      }
  );

  // Do check the scope, it might not work
  
  app.get('/auth/windowslive', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails',
   'wl.phone_numbers', 'wl.photos', 'wl.postal_addresses', 'wl.offline_access'] }));
  
  app.get('/auth/windowslive/callback', 
  passport.authenticate('windowslive', { failureRedirect: '/' }),
  function(req, res) {
    
    
        res.redirect('/home');
		
  });

  // Do check the scope, it might not work
  
  app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email',
   'https://www.googleapis.com/auth/plus.login']}));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req,res){
		
        res.redirect('/home');
		
    }  
  );
  
};

