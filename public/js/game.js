 //$(document).ready(function(){
   

window.onload = init;

	var usedArray = new Array(76);
	var baseArray = new Array(0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2);
	var number = 0;
	var base = 0;

	var name;
   
//   init();
 
	function init(){
		getName();
		for(var i = 0; i<24; i++){
			fillCard(i);
		}
	}

	function getName(){
		var name = prompt('Enter name: ');
		if(name === null){
			alert("You must enter a name to play!");
			getName();
		}
//		console.log('name is ' + name);
		socket.emit('setName', {username: name});
	}
	  	 
	function fillCard(i){
		base = baseArray[i] * 15;
		 
		 //console.log("base"+base);
		var names = ["A",
				  "B",
				  "C",
				  "D",
				  "E",
				  "F",
				  "G",
				  "H",
				  "I",
				  "J",
				  "K",
				  "L",
				  "M",
				  "N",
				  "O",
				  "P",
				  "Q",
				  "R",
				  "S",
				  "T",
				  "U",
				  "V",
				  "W",
				  "X",
				  "Y",
				  "Z",
				  "AA",
				  "BB",
				  "CC",
				  "DD",
				  "EE",
				  "FF",
				  "GG",
				  "HH",
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
			}
			else{
				fillCard(i);
			}
	}
	 
	function resetUsedNumbersArray(){
		for(var j = 0; j < usedArray.length; j++){
		usedArray[j] = false;
		}	
	}
	 
	 //$('#newCard').click(function(){
	 //	resetUsedNumbersArray();
	 //	init();
	 //});

	 $(function() {
		 $('td').click(function(){
			var toggle = this.style;
			toggle.backgroundColor = toggle.backgroundColor? "":"#333";
			toggle.color = toggle.color? "":"#fff";
			//console.log("Clicked cell ID:" + this.id);
			socket.emit('userClick', this.id);
		 });
		$('button').click(function(){
			socket.emit('playerWins');
		});
	 });



