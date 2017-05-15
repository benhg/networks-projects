window.onload = ready;
var empty_x;
var empty_y;
var numMoves = 0;
var time = 1;
var flag = 1;
var winners = [];

function ready() {
    setBoard();
    document.getElementById("reset").onclick = reset;
    document.getElementById("shufflebutton").onclick = shuffle;
}

function setBoard() {
    var k = 1;
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 4; j++) {
            if (k < 16) {
                var piece = document.createElement("div");
                piece.className = "piece";
                piece.id = j + "_" + i;
                piece.style.backgroundPosition = "" + (5 - j) * 100 + "px " + (5 - i) * 100 + "px";
                piece.style.position = "absolute";
                piece.style.left = ((j - 1) * 100) + "px";
                piece.style.top = ((i - 1) * 100) + "px";
                piece.innerHTML = k;
                var area = document.getElementById("puzzlearea");
                area.appendChild(piece);
                var clicker = document.getElementById(j + "_" + i);
                clicker.onclick = function() {
                    processMove(this.id, 0);
                };
                k++;
            }
        }
    }
    empty_x = 4;
    empty_y = 4;
}

function processMove(id, skip) {
    var x = id.split("_")[0];
    var y = id.split("_")[1];
    if (is_movable(x, y)) {
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.left = ((empty_x - 1) * 100) + "px";
        document.getElementById(id).style.top = ((empty_y - 1) * 100) + "px";
        document.getElementById(id).id = empty_x + "_" + empty_y;
        empty_x = x;
        empty_y = y;
        if (numMoves === 0 && skip != 1 && flag == 1) {
            startTimer();
            console.log("timer");
            flag = 0;
        }
        numMoves++;
        document.getElementById("moves").innerHTML = numMoves;
        if (skip != 1) {
            if (checkVictory()) {
                victory();
            }
        }

    } else {
        console.log("You can't move that!");
    }
}

function reset() {
    document.getElementById("h1").innerHTML = "CSE 154 Fifteen Puzzle";
    document.getElementById("h1").style.color = "black";
    var area = document.getElementById("puzzlearea");
    while (area.firstChild) {
        area.removeChild(area.firstChild);
    }
    setBoard();
    time = 1;
    numMoves = 0;
    document.getElementById("moves").innerHTML = numMoves;
}

function shuffle() {
    reset();
    for (var i = 0; i <= 10000; i++) {
        var rand_x = Math.floor(Math.random() * 4) + 1;
        var rand_y = Math.floor(Math.random() * 4) + 1;
        if (is_movable(rand_x, rand_y)) {
            processMove(rand_x + "_" + rand_y, 1);
        }
    }
    time = 1;
    numMoves = 0;
    document.getElementById("moves").innerHTML = numMoves;
}

function is_movable(x, y) {
    return ((x == empty_x) && Math.abs(y - empty_y) == 1) || ((y == empty_y) && (Math.abs(x - empty_x) == 1));
}

function startTimer() {
    window.setInterval(function() {
        var totalSeconds = time;
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        var timeHMS = hours + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        document.getElementById("time").innerHTML = timeHMS;
        time++;
    }, 1000);
}

function checkVictory() {
    var arr = [];
    if (numMoves > 25) {
        for (var j = 1; j <= 4; j++) {
            for (var i = 1; i <= 4; i++) {
                //console.log(i,j)
                var val = document.getElementById(i + "_" + j);
                //console.log(val);
                if (val !== null) {
                    arr.push(parseInt(val.innerHTML));
                }
            }
        }

        for (var i = 0; i < arr.length - 1; i++) {
            //console.log(arr);
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }
}

function victory() {
   var tiles = document.getElementsByClassName('piece');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].style.borderColor = "gold";
        tiles[i].style.color = "gold";
    }
    var h1 = document.getElementById("h1");
    h1.style.color = "gold";
    h1.innerHTML = "You Win!!!!";
    var winner = [numMoves, time];
    winners.push(winner);
    winners.sort();
    var h2 = document.createElement('h4');
    h2.innerHTML = "Best Winner: " + winners[0][0] + " moves in " + winners[0][1] + " seconds.";
    h1.appendChild(h2);
    clearInterval();

}
