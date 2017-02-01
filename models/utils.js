function Utils(){
};

Utils.prototype.checkIfWon = function(playerInput){
	// compare arr with win condition
	var sortIn = playerInput.sort(sortNumber);
	var playerWin = checkForWin(sortIn);
	return playerWin;
};

Utils.prototype.sendMessageToAll = function(io, msg, players) {
	for(var i = 0; i < players.length; i++) {
		io.sockets.socket(players[i].id).emit(msg);
	}
};

function checkForWin(arr) {
	var winners = [
		['0','1','2','3','4'],
		['5','6','7','8','9'],
		['10','11','free','12','13'],
		['14','15','16','17','18'],
		['19','20','21','22','23'],
		['0','5','10','14','19'],
		['1','6','11','15','20'],
		['2','7','free','16','21'],
		['3','8','12','17','22'],
		['4','9','13','18','23'],
		['0','6','free','17','23'],
		['4','8','free','15','19']
	];

	var index = 0;
	var count = 0;
	while(index < winners.length) {
		var tmpArr = winners[index];
		for(var i = 0; i < arr.length; i++) { 
			if(tmpArr.indexOf(arr[i]) !== -1) {
//				console.log("Found " + arr[i] + "in " + tmpArr + " and COUNT = " + count);
				count++;
			}
			if(count === 5) {
//                        	console.log("WINNER FOUND");
	                        return true;
        	        }
		}
		count = 0;
		index++;
	}
	return false;
};

function sortNumber(a,b) {
	return a - b;
};

function searchForArr(haystack, needle) {
	var i, j, current;
	for(i = 0; i < haystack.length; i++) {
		if(needle.length === haystack[i].length) {
			current = haystack[i];
			for(j = 0; j < needle.length && needle[j] === current[j]; j++);
			if(j === needle.length) {
				return i;
			}
		}
	}
	return -1;
};

module.exports = Utils;
