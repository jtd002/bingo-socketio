function Player(playerID){
	this.id = playerID;
	this.name = "";
	this.selectedNums = ['free'];
};

Player.prototype.setName = function(name){
	this.name = name;
};

Player.prototype.getName = function(){
	return this.name;
};

Player.prototype.setID = function(){
	return this.id;
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
