window.onload=function() {

	var submit = document.getElementById('submit');
	submit.onclick=function(){
		var words = document.getElementById('input').value.replace( /\n/g, " ").trim().split(" ");
		updateText(words);
	};
	

};

function updateText(words){

	var paused = false;

 function pauseOrResume(){
		if(paused == false){
			paused = true;
			document.getElementById("pause").innerHTML ='Resume';
		}else{
			paused = false;
			document.getElementById("pause").innerHTML ='Pause';
		}

		document.getElementById("pause").blur();
	};

	var checkSpace = function(e){
		if(e.keyCode == 32){
			pauseOrResume();
		}
	};

	var pause = document.getElementById("pause");
	pause.onclick=pauseOrResume;
	//$(document).bind('keypress.spacebar', checkSpace);

	var i = 0;
	var marginLeft;
	var el = document.getElementById('speed');
	var speed=el.options[el.selectedIndex].value;

	var textLoop = setInterval(function(){
		if(!paused){		
			if(i <= words.length - 1){
				document.getElementById("panel").innerHTML= generateRedChar(words[i++]);
				}else{
				clearInterval(textLoop);
				document.getElementById("panel").innerHTML=""
			} 
		}
	}, speed);
}

function generateRedChar(currentWord){
	var optimalCharPoint;
	var subLeft, subRight;
	var currentWordLength = currentWord.length;
	var result;

	if(currentWordLength == 1){
		optimalCharPoint = 0;
	}else if(currentWordLength >= 2 && currentWordLength <= 5){
		optimalCharPoint = 1;
	}else if(currentWordLength >= 6 && currentWordLength <= 8){
		optimalCharPoint = 2;
	}else if(currentWordLength >= 9 && currentWordLength <= 13){
		optimalCharPoint = 3;
	}else{
		console.log('Word length greater than 13.');
		optimalCharPoint = 4;
	}

	if(optimalCharPoint == 0){
		result = '<p id = "left_offset">' + '<span id = "red">' + currentWord + '</span>' + '</p>';
		return result;

	}else{
		subLeft = '<span id = "left_text">' + currentWord.substring(0,optimalCharPoint) + '</span>';
		subRight = '<span id = "right_text">' + currentWord.substring(optimalCharPoint + 1, currentWordLength + 1) + '</span>';
		result = '<p id = "left_offset">' + subLeft + '<span id = "red">' 
			+ currentWord.charAt(optimalCharPoint) + '</span>' + subRight + '</p>';
		return result;
	}

}



function resize() {
    var medsize = "36pt"
    var bigsize = "48pt"
    var biggersize = "60pt"
    if (document.getElementById("size_med").checked) {
        document.getElementById("panel").style.fontSize = medsize;
    } else if (document.getElementById("size_big").checked) {
        document.getElementById("panel").style.fontSize = bigsize;
    } else if (document.getElementById("size_bigger").checked) {
        document.getElementById("panel").style.fontSize = biggersize;
    }
}

