function Player(playerID){
	this.id = playerID;
	this.clientId = "";
	this.name = "";
	this.selectedNums = ['free'];
	this.board = [];
};

Player.prototype.setName = function(name){
	this.name = name;
};

Player.prototype.getName = function(){
	return this.name;
};

Player.prototype.setId = function(id){
	this.clientId = id;
};

Player.prototype.getId = function(){
	return this.clientId;
};

Player.prototype.setBoard = function(board){
	this.board = board;
};

Player.prototype.getBoard = function(){
	return this.board;
};

Player.prototype.setNumArray = function(arr){
	this.selectedNums = arr;
};

Player.prototype.setNums = function(cell){
	this.selectedNums.push(cell);
};

Player.prototype.removeNums = function(cell) {
	var index = this.selectedNums.indexOf(cell);
	this.selectedNums.splice(index, 1);
};

Player.prototype.getNums = function(){
	return this.selectedNums;
};

module.exports = Player;
