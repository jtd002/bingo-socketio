//Not used at the moment

Array.prototype.remove = function(from, to) {
	if (this.length > 0) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	} else {
		console.log("length is zero");
	}
};

function Room(name){
	this.players = [];
	this.name = name;
};

Room.prototype.addPlayer = function(player) {
	this.players.push(player);
};

Room.prototype.removePlayer = function(player) {
	var playerIndex = -1;
	console.log("room players.length is " + this.players.length);
	for(var i = 0; i < this.players.length; i++) {
		if(this.players[i].id == player.id){
			playerIndex = i;
			break;
		}
	}
	this.players.remove(playerIndex);
};

Room.prototype.getPlayer = function(playerId) {
	var player = null;
	for(var i = 0; i < this.players.length; i++) {
		if(this.players[i].id == playerId) {
			player = this.players[i];
			break;
		}
	}
	return player;
};

module.exports = Room;
