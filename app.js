/**
 * Simplest MEAN BoilerPlate
 * Author: Sojharo
 * GitHub: https://github.com/sojharo
 * LinkedIn: https://www.linkedin.com/pub/sojharo-mangi/18/360/62b
 * 
 * Description: 
 * 
 * I am developing this boilerplate as a hobbyist. This is not complete and should not be used in serious project.
 * This boilerplate is for novice and beginners specially for those programmers who are new to world of web application development.
 * As I am also new to Nodejs, Angularjs, Expressjs & MongoDB, therefore, I have tried to make such a boilerplate which is simplest 
 * and easiest of all available mean boilerplates. It doesn't demand you to be expert of all the MEAN technologies.
 *
 * This boilerplate should be used for learning purpose. I repeat, please go for http://meanjs.org or http://mean.io if you need
 * a boilerplate to kick start a serious application. This project is not following best practices which are being followed by the
 * projects on the mentioned URLs.
 *
 * History 
 *
 * I used several tutorials on Nodejs, Angularjs and Expressjs to build my final year project. When I finished my project, I realized
 * that I can reuse much of the code in this project to kick start another project. After this, I came to know about boilerplates.
 * When I learnt what boilerplates are, I realized, I can also make one simplest MEAN boilerplate from my final year project code.
 * Basically, this is the skeleton of my final year project code with, of course, logic code removed. Now I can use this to kick
 * any MEAN-based application. Hey!! I mean a real-time web application using socket.io
 *
 * As I already told, that I am naive and a beginner, I would prefer this simple boilerplate for my projects until I am expert in
 * MEAN technologies. When I think I have got enough experience, I would switch to mean.io or meanjs. They have the way for you to
 * how to write test code too.
 *
 * Sorry, for not using best practices as I am still learning what the best practices are. No offense to expert and serious programmers :)
 *
 * Note: This is both HTTP server. Use app_https.js file, if you want https server.
 * 
 */

// dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var https = require('https');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




/**
 *
 * Creating an Expressjs application
 *
 */

var app = express();





// Some stuff generated by ExpressJS

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('f83b0cd6ccb20142185616'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});







/**
 *
 * Here goes the AUTHENTICATION related stuff. PassportJS is the best module for authentication. All these files are stored in
 * a directory called models.
 *
 */

// passport local authentication config

var Users = require('./models/account');
passport.use(new LocalStrategy(Users.authenticate()));

// For authentication using Facebook, Google and MSN

var federateAccounts = require('./models/federateAccounts');
passport.use(federateAccounts.facebook);
passport.use(federateAccounts.google);
passport.use(federateAccounts.windows);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});






/**
 *
 * Here is how to connect to mongodb.
 *
 * Note: replace mydatabse with name of your database
 *
 */

mongoose.connect('mongodb://localhost/mydatabase');






/**
 *
 * All the route handlers code is written in index.js file in routes folder. 
 *
 */

require('./routes')(app);






/**
 *
 * Creating an http server
 *
 */

var server = http.createServer(app)







/**
 *
 * BONUS FOR YOU :P
 *
 * You can make your application real-time by using socket.io. Basic server-side code for socket.io is done here.
 *
 *
 */

var io2 = require('socket.io').listen(server);






/**
 *
 * Some configuration stuff for socket.io. Please, refer a good book to learn more about this.
 *
 */

io2.set('heartbeat interval', 20);
io2.set('heartbeat timeout', 60); 
io2.set('close timeout', 60); 

io2.enable('browser client minification');  // send minified client
io2.enable('browser client etag');          // apply etag caching logic based on version number
io2.enable('browser client gzip');          // gzip the file
io2.set('log level', 1);                    // reduce logging

// enable all transports (optional if you want flashsocket support, please note that some hosting
// providers do not allow you to create servers that listen on a port different than 80 or their
// default port)
io2.set('transports', [
    'websocket'
  , 'htmlfile'
  , 'xhr-polling'
  , 'jsonp-polling'
]);






/**
 *
 * Http server starts to listen here. 
 *
 */

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






/**
 *
 * SOCKET.IO in ACTION
 *
 * I had learnt this code from Internet. This belongs to someone else I don't remember who.
 * This code is also modified alot and is somewhat different from the code of that guy.
 *
 * If I am not wrong, this code belongs to Sam Dutton. Thanks Man, You are a Great Guy.
 *
 */

io2.sockets.on('connection', function (socket){

  
    // convenience function to log server messages on the client

	function log(){
		var array = [">>> Message from server: "];
	  for (var i = 0; i < arguments.length; i++) {
	  	array.push(arguments[i]);
	  }
	    socket.emit('log', array);
	}




	// Captures whenever there is a message called message.

	socket.on('message', function (message) {
		
		// Also log the message on the client-side

		log('Got message:', message);
		
		
		// This is what I needed in my application. Please go down to see more options in a cheat-sheet given below

		socket.broadcast.to(message.room).emit('message', message.msg);

		
	});




	// Whenever a client wants join a room

	socket.on('create or join', function (room) {

		// length of room

		var numClients = io2.sockets.clients(room.room).length;



		// Also log this news on the client-side
		
		log('Room ' + room.room + ' has ' + numClients + ' client(s)');
		log('Request to create or join room ' + room.room + ' from '+ room.username);
		
		

		// Creating a room or inserting the client in the room named room.room

		if (numClients === 0){

			// creating a new room here

			socket.join(room.room);
			socket.set('nickname', room.username);
			socket.emit('created', room);

		} else {

			// Making the client join the room here

			io2.sockets.in(room.room).emit('join', room);			
			socket.join(room.room);
			socket.set('nickname', room.username);
			socket.emit('joined', room);

		}

		// Giving the news to all members of the room about new member.
		
		socket.emit('emit(): client ' + socket.id + ' joined room ' + room.room);
		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room.room);
		
	});


	// do this when a member leaves the room
	
	socket.on('leave', function (room) {
		
		io2.sockets.in(room.room).emit('left', room);
		socket.leave(room.room);
		socket.emit('left', room);
				
	});
	


});



/**
 * 
 * Mini cheat-sheet of Socket.io
 *
 */

/*
 // send to current request socket client
 socket.emit('message', "this is a test");

 // sending to all clients, include sender
 io.sockets.emit('message', "this is a test");

 // sending to all clients except sender
 socket.broadcast.emit('message', "this is a test");

 // sending to all clients in 'game' room(channel) except sender
 socket.broadcast.to('game').emit('message', 'nice game');

  // sending to all clients in 'game' room(channel), include sender
 io.sockets.in('game').emit('message', 'cool game');

 // sending to individual socketid
 io.sockets.socket(socketid).emit('message', 'for your eyes only');
 */
