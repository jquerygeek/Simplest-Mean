/**
 *
 * These are not collections. They are handling the case when user logs in using facebook, google or msn.
 * I would give detailed explanation of these in future. For now, they can be used as they are.
 * Just replace values of client id, secret and callback with your values
 *
 * Callback URL can be replaced with localhost if you are on localhost
 *
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var WindowsLiveStrategy = require('passport-windowslive').Strategy;
var otherSchemas = require('./../models/otherSchemas');
var Users = require('./account');


exports.windows = new WindowsLiveStrategy({
    clientID: "your-client-id-given-to-you-by-windows",
    clientSecret: "your-client-secret-given-to-you-by-windows",
    callbackURL: "http://www.mywebapplication.com/auth/windowslive/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	  
    Users.findOne({windowsId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{

        	// This is handling the case of users with email address already registered with us.
        	// I would explain this further. You can change it according to your case.
			
			 Users.count({email : profile.emails[0].value}, function(err, gotCount){
					if (err) return console.log(err)
					
					if(gotCount>0)//0
					{
						Users.findOne({email : profile.emails[0].value}, function(err, oldAccount){
							done(null, oldAccount);
						})
					}
					else
					{
						var newUser = new Users({
						   windowsId : profile.id,
						   firstname : profile.name.givenName,
						   lastname : profile.name.familyName,
						   email : profile.emails[0].value,
						   phone : profile._json.phones.personal,
						   windows_photo: profile.photos[0].value
						}).save(function(err,newUser){
							if(err) throw err;

							// Saving the news about new registration. You can remove this if you don't need
							
							var news = otherSchemas.news
						
							var currentNews = new news({
								   label : 'Registration',
								   content : ''+ newUser.firstname +' '+ newUser.lastname +' has made an account on mywebapplication with windows live.',
								   datetime : { type: Date, default: Date.now }
							});
							
							currentNews.save(function (err) {
								if (err) console.log(err)
							})
							
							done(null, newUser);
						});
					}
					
			 })
        }
    });
  }
);

exports.facebook = new FacebookStrategy({
    clientID: "your-client-id-given-to-you-by-facebook",
    clientSecret: "your-client-secret-given-to-you-by-facebook",
    callbackURL: "http://www.mywebapplication.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	
    Users.findOne({fbId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{

        	// This is handling the case of users with email address already registered with us.
        	// I would explain this further. You can change it according to your case.
			
			Users.count({email : profile.emails[0].value}, function(err, gotCount){
					if (err) return console.log(err)
					
					if(gotCount>0)//0
					{
						Users.findOne({email : profile.emails[0].value}, function(err, oldAccount){
							done(null, oldAccount);
						})
					}
					else
					{
						var newUser = new Users({
						   fbId : profile.id ,
						   email : profile.emails[0].value,
						   firstname : profile.name.givenName,
						   lastname : profile.name.familyName,
						   fb_photo: 'https://graph.facebook.com/'+ profile.id +'/picture?width=140&height=110'
						}).save(function(err,newUser){
							if(err) throw err;

							// Saving the news about new registration. You can remove this if you don't need
							
							var news = otherSchemas.news
						
							var currentNews = new news({
								   label : 'Registration',
								   content : ''+ newUser.firstname +' '+ newUser.lastname +' has made an account on mywebapplication with Facebook.',
								   datetime : { type: Date, default: Date.now }
							});
							
							currentNews.save(function (err) {
								if (err) console.log(err)
							})
							
							done(null, newUser);
						});
					}
			})
            
        }
    });
  }
)

exports.google = new GoogleStrategy({
    clientID: 'your-client-id-given-to-you-by-google',
    clientSecret: 'your-client-secret-given-to-you-by-google',
    callbackURL: "http://www.mywebapplication.com/auth/google/callback",
    scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  },
  function(accessToken, refreshToken, profile, done) {
	 
     Users.findOne({googleId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{

        	// This is handling the case of users with email address already registered with us.
        	// I would explain this further. You can change it according to your case.
			
			Users.count({email : profile.emails[0].value}, function(err, gotCount){
					if (err) return console.log(err)
					
					if(gotCount>0)//0
					{
						Users.findOne({email : profile.emails[0].value}, function(err, oldAccount){
							done(null, oldAccount);
						})
					}
					else
					{
						var newUser = new Users({
						   googleId : profile.id ,
						   email : profile.emails[0].value,
						   firstname : profile.name.givenName,
						   lastname : profile.name.familyName,
						   google_photo: profile._json.picture
						}).save(function(err,newUser){
							if(err) throw err;

							// Saving the news about new registration. You can remove this if you don't need
							
							var news = otherSchemas.news
						
							var currentNews = new news({
								   label : 'Registration',
								   content : ''+ newUser.firstname +' '+ newUser.lastname +' has made an account on mywebapplication with Google.',
								   datetime : { type: Date, default: Date.now }
							});
							
							currentNews.save(function (err) {
								if (err) console.log(err)
							})
							
							done(null, newUser);
						});
					}
			})
			
            
        }
    });
  }
)
