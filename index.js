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
var io = require('socket.io')(server,{});

var room = new Room("test");

// Listen for Socket.IO connections
io.sockets.on('connection',function(socket){
	// Logs message when connection detected
	//console.log('socket connection detected');
	//set player name
//	socket.emit('setName');
//	socket.on('reconnect', function() {
//		socket.socket.reconnect();
//	});
	socket.on('setName',function(data) {
		var player = new Player(socket.id);
		player.setName(data.username);
		// addPlayer function not working, returns undefined
		room.addPlayer(player);
		console.log('player name is ' + player.getName());
	});

//	socket.emit('userClick');
	//Write cell id to server on click
	socket.on('userClick',function(data) {
		var player = room.getPlayer(socket.id);
		user = player.getName();

		//functionality to check if element in arry before adding
		if (player.selectedNums.indexOf(data) === -1) {
			player.setNums(data);
			console.log("set: " + data);
		}
		else {
			player.removeNums(data);
			console.log("remove: " + data);
		}

		console.log("SERVER: " + user + ' clicked ' + player.getNums());
	});

	socket.on('playerWins',function(data) {
		var utils = new Utils();
		var player = room.getPlayer(socket.id);
		user = player.getName();
		console.log("User " + user + " clicked bingo.");
		// sendMessage aint working.
		if(utils.checkIfWon(player.getNums())){
			console.log("Player " + user + " WINS!");
			var message = user + " has a bingo!";
			//utils.sendMessageToAll(io, message, room.players);
			io.emit('message',message);
		} else {
			console.log("False win condition");
		}

	});
});
