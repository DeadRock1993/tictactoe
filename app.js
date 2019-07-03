let td = Array.from(document.getElementsByTagName('td'));
let colors = [ '#05ffb0', '#C04848', '#EB3349', '#EC6F66', '#8E54E9', '#FFC837', '#FECF6A', '#B676B1', '#8F3985' ];
let HUplayer = 'X';
let AI = 'O';
let m = [ 'block', 'inline' ];
let log = document.getElementById('log');
let msgPl = document.getElementById('msgPl');
let msgAi = document.getElementById('msgAi');
let msgDr = document.getElementById('msgDR');

//Wining position to check
let winCombo = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 4, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 2, 4, 6 ]
];
//check if someone win
let endGame = false;
//getting PlayerBox AiBox if DrawBox
let plScore = document.getElementById('plScore');
let aiScore = document.getElementById('aiScore');
let drScore = document.getElementById('drScore');
//getting restart button & click - should clear the board and and return the click Events for every cell
let restart = document.getElementById('reset').addEventListener('click', function() {
	td.map((elm) => {
		elm.innerHTML = '';
		endGame = false;
		addEvent();
		msgPl.style.opacity = 0;
		msgAi.style.opacity = 0;
		msgDr.style.opacity = 0;
		document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
	});
});
//click event function
function addEvent() {
	td.forEach((x) => x.addEventListener('click', boxes));
}
//remove event function
function removeEvent() {
	td.forEach((x) => x.removeEventListener('click', boxes));
}
addEvent();
//Available slots/cells for AI to move
function checkerForEmpty() {
	return td.filter((t) => !t.innerHTML);
}
//check if gameOver if is then remove all click events
function endGameChecker() {
	if (endGame) {
		removeEvent();
	}
}
//main function; every click puts X on the boear and removes click event on already clicked cell;
//getting empty slots to check for slots to move AI if length of emptySlots >0 then we have at least one move & remove click events on the same cell that our AI made move & last not least to check if someone WIN at this state
function boxes() {
	this.innerHTML = HUplayer;
	this.removeEventListener('click', boxes);
	checkWinner();
	endGameChecker();
	let emptySlots = checkerForEmpty();
	if (emptySlots.length > 0 && !endGame) {
		let oneEmptySlot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
		oneEmptySlot.innerHTML = AI;
		oneEmptySlot.removeEventListener('click', boxes);
		checkWinner();
	}
}

//to check who won creates two arrays one for X and for
//and then checks if one of this arrays have 3 or more items in it once it has 3 items
//it starts checking if one of this arrays have every item in winCombo[i] arrays
function checkWinner() {
	let arrOfX = [];
	let arrOfO = [];
	td.map((curr, index) => {
		curr = curr.innerHTML;
		if (curr === 'X') {
			arrOfX.push(index);
		} else if (curr === 'O') {
			arrOfO.push(index);
		}
	});

	for (let i = 0; i < winCombo.length; i++) {
		if (arrOfX.length >= 3 && winCombo[i].every((elem) => arrOfX.indexOf(elem) > -1)) {
			endGame = true;
			plScore.innerHTML = Number(plScore.innerHTML) + 1;
			msgPl.style.opacity = 1;
			break;
		} else if (arrOfO.length >= 3 && winCombo[i].every((elem) => arrOfO.indexOf(elem) > -1)) {
			endGame = true;
			aiScore.innerHTML = Number(aiScore.innerHTML) + 1;
			endGameChecker();
			msgAi.style.opacity = 1;
			break;
		}
	}
	if (arrOfX.length === 5 && arrOfO.length === 4) {
		if (!endGame) {
			drScore.innerHTML = Number(drScore.innerHTML) + 1;
			msgDr.style.opacity = 1;
		}
	}
}
/*
function maxmin(){
  let empty=checkerForEmpty();
  let arrOfX=[];
  let arrOfO=[];
  td.map((curr,index)=>{
    curr=curr.innerHTML;
    if (curr==="X"){
      arrOfX.push(index);
    } else if (curr==='O'){
      arrOfO.push(index);
    }
  });
  
  if (arrOfX.length>=3 && winCombo[i].every(elem=>arrOfX.indexOf(elem)>-1)) {
    return 10;    
  }
  if (arrOfO.length>=3 && winCombo[i].every(elem=>arrOfO.indexOf(elem)>-1)){
    return -10;  
  }
  if (empty.length===0 && !endGame){
    return 0;
  }
  console.log(empty);
  
}

*/
