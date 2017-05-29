 //$(document).ready(function(){
window.onload = init;

	var usedArray = new Array(76);
	var baseArray = new Array(0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2);
	var playerGameBoard = [];
	var number = 0;
	var base = 0;

	var chosenNums = ['free'];
	var name;
	var clientId = Math.random().toString(36).substr(2,10);

	function init(){
		name = getName();
		for(var i = 0; i<24; i++){
			fillCard(i);
		}
		connect();
	}

	function connect() {
		socket.emit('clientConnect', {username: name, Id: clientId, board: playerGameBoard, chosenNumbers: chosenNums});
	}

	function getName(){
		if(name === undefined || name === null || name === ""){
			name = prompt('Enter name: ');
			if(name === null){
				alert("You must enter a name to play!");
				getName();
			}
		}
		//console.log("getName name is " + name);
		return name;
//		socket.emit('setName', {username: name});
//		socket.emit('authenticate', {username: name});
	}

	// send player data to server
//	socket.emit('clientConnect', {username: name, Id: clientId, board: playerGameBoard}; 
	  	 
	function fillCard(i){
		base = baseArray[i] * 15;
		 
		 //console.log("base"+base);
		var names = ["Joseph botches a name",
				  "\"My Humps\"",
				  "Cell phone rings",
				  "Cow Bell",
				  "Wedding Crasher(s)",
				  "Tears from bride/groom",
				  "Kids dance together",
				  "We run out of booze",
				  "Mother and father of bride dance",
				  "Mother and father of groom dance",
				  "Lyndsay laughs",
				  "Geoff laughs",
				  "\"#ForeverMoore\"",
				  "Clinking glasses",
				  "Line Dancing",
				  "Bride and Groom kiss after first dance",
				  "Song you requested is played",
				  "Centerpiece goes out",
				  "CUPCAKES!",
				  "Someone double fisting drinks",
				  "Bride ditches her shoes",
				  "Someone makes a ridiculous breakfast concoction",
				  "Glitter",
				  "\"Gravy goes on everything!\"",
				  "Josh Groban plays",
				  "Groom and best man laughing",
				  "Someone rips their pants",
				  "Bride and maid of honor hugging",
				  "Someone makes a toast",
				  "Group photo",
				  "EE",
				  "FF",
				  "GG",
				  "Hotter than 90 degrees",
				  "II",
				  "JJ",
				  "KK",
				  "LL",
				  "MM",
				  "NN",
				  "OO",
				  "PP",
				  "QQ",
				  "RR",
				  "SS",
				  "TT"]; 
		// Math.random * maximum value (floor gives int of math.random) + 1 = 0 < val < max 
		number = base + Math.floor(Math.random()*15)+1;		
		//console.log(names[number]);
		 
		if(usedArray[number] != true){
				$('#'+i).html(names[number]);
				usedArray[number] = true;
				playerGameBoard.push(names[number]);
			}
			else {
				fillCard(i);
			}
	}
	 
	function resetUsedNumbersArray(){
		for(var j = 0; j < usedArray.length; j++){
			usedArray[j] = false;
		}	
	}

	$(function() {
		$('td').click(function(){
			var toggle = this.style;
			toggle.backgroundColor = toggle.backgroundColor? "":"#333";
			toggle.color = toggle.color? "":"#fff";
			//console.log("Clicked cell ID:" + this.id);
			socket.emit('userClick', this.id);
			chosenNums.push(this.id);
		});
		$('button').click(function(){
			socket.emit('playerWins');
		});
	 });
