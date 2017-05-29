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
app.get('/bingo',function(req, res) {
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
var io = require('socket.io')(server,{'pingTimeout': 120000, 'pingInterval':1000});
//var io = require('socket.io')(server,{'pingTimeout': 2000, 'pingInterval':1000});

var room = new Room("test");

// Listen for Socket.IO connections
io.sockets.on('connection',function(socket){
	// Logs message when connection detected
	console.log('socket connection detected');

	socket.on('clientConnect',function(data){
		var player = new Player(socket.id);
		player.setId(data.Id);
		console.log("clientConnect Id: " + data.Id);

		player.setName(data.username);
		console.log("clientConnect name: " + data.username);
		
		player.setBoard(data.board);
		console.log("clientConnect board: " + data.board);

		player.setNumArray(data.chosenNumbers);
		console.log("clientConnect nums: " + data.chosenNumbers);

		if(player.getName != null) {
                        room.addPlayer(player);
                        console.log('player name is ' + player.getName());
                } else {
                        console.log("Player is null. Do something else");
                }
	});

	socket.on('disconnect',function(){
		var player = room.getPlayer(socket.id);
		try {
			var name = player.getName();
			console.log("socket connection disconnected. Player " + name + " removed.");
	                socket.emit('clientDisconnect');
        	        socket.emit('playerNumsChosen',player.getNums());
			room.removePlayer(player);
		}
		catch (err) {
			console.log("Unable to get player name: " + err);
		}
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
			}
			else {
				player.removeNums(data);
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
			io.to(socket.id).emit('message',"No... not a bingo. Try again.");
		}

	});
});
