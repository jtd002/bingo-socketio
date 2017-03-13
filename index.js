// Import Express module
var express = require('express');

// Create new instance of Express
var app = express();

// Create a Node.js http server
var server = require('http').Server(app);

var Player = require('./models/player.js');
var Room = require('./models/room.js');
var Utils = require('./models/utils.js');

// Send requests to web root to index.html
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/public/game.html');
});

// Ensure only requests to '/public' get served
app.use('/public',express.static(__dirname + '/public'));

// Set server to listen on port 3000
server.listen(3000);

console.log("Server started on port 3000");


// Socket.io
// Create a Socket.IO server

//1800000 is 30 minutes
//var io = require('socket.io')(server,{'pingTimeout': 120000, 'pingInterval':1000});
//below for testing only
var io = require('socket.io')(server,{'pingTimeout': 5000, 'pingInterval':5000});

// need to figre out how to set this timeout value very high. timeout after 120+20s
//7200000000 = 120 minutes
//io.set('heartbeat timeout', 900000000);
//io.set('heartbeat timeout', 1000);
//io.set('heartbeat interval',1000);
//io.set('close timeout',1000);

var room = new Room("test");

// Listen for Socket.IO connections
io.sockets.on('connection',function(socket){
	// Logs message when connection detected
	console.log('socket connection detected');
	console.log('socketID = ' + socket.id);
//	socket.emit('setPlayerID',socket.id);

/*	socket.on('getPlayerID',function(data){
		console.log("start getPlayerID");
		var player = room.getPlayer(socket.id);
		if(null == player) {
			console.log("player null in getPlayerID");
			socket.emit('setPlayerID',socket.id);
		}
		else {
			console.log("getPlayerID is true. Do something...");
			console.log("getPlayerID ID: " + data);
		}
	});
*/
	socket.on('disconnect',function(){
		var player = room.getPlayer(socket.id);
		try {
			var name = player.getName();
		}
		catch (err) {
			console.log("Unable to get player name: " + err);
		}
		console.log("socket connection disconnected. Player " + name + " removed.");
		//console.log("room.removePlayer");
		room.removePlayer(player);
	});

	socket.on('setName',function(data) {
		var player = new Player(socket.id);
		//try {
		console.log("username: " + data.username);
		//this line stays
		player.setName(data.username);
		//} catch(err) {
		//	console.log(err);
		//}
		if(player.getName != null) {
			//console.log("room.addPlayer");
			room.addPlayer(player);
			console.log('player name is ' + player.getName());
		} else {
			console.log("Player is null. Do something else");
		}
		//send socketio for player to renew session
		//socket.emit('playerID',socket.id);
	});

	//Write cell id to server on click
	socket.on('userClick',function(data) {
		var player = room.getPlayer(socket.id);
		if(null === player) {
			console.log("player is null");
			// send player array and board from client here to be populated on reconnect
		}
		else {
			try {
				user = player.getName();
			} catch(err) {
				console.log("Click error for player");
			}

			//functionality to check if element in array before adding
			if (player.selectedNums.indexOf(data) === -1) {
				player.setNums(data);
				//console.log("set: " + data);
			}
			else {
				player.removeNums(data);
				//console.log("remove: " + data);
			}

			console.log("SERVER: " + user + ' clicked ' + player.getNums());
		}
	});

	socket.on('playerWins',function(data) {
		var utils = new Utils();
		var player = room.getPlayer(socket.id);
		try {
			user = player.getName();
		} catch(err) {
			console.log("Error determining player name in playerWins");
		}
		console.log("User " + user + " clicked bingo.");
		if(utils.checkIfWon(player.getNums())){
			console.log("Player " + user + " WINS!");
			var message = user + " has a bingo!";
			io.emit('message',message);
		} else {
			console.log("False win condition");
		}

	});

	socket.on('savePlayerState',function(data) {
		console.log(data);
		var  player = room.getPlayer(socket.id);
		try {
			user = player.getName();
			console.log("savePlayerState user: " + user);
		} catch(err) {
			console.log("error getting name in savePlayerState");
		}
	});
});
