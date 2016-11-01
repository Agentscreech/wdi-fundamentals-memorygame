console.log("JS file is connected to HTML! Woo!");
var cardPairs = [];
var cardsInPlay = [];
var cardsMatched = [];
var toBeRemoved = [];
var cards = [];
var boardMaker = document.getElementById('game-board');

var possibleCardsGenerator = function (qty) { // generates 2 arrays, one set of pairs for rendering and the other is for comparing matched cards for victory conditions
  for (var i = 1; i <= qty; i++){
    cards.push(i);
    cardPairs.push(i,i);
  }
};

function shuffle(array) { //stole this from stackOverflow, it randomizes the array.
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var createBoard = function(qty) {
    for (var i = 0; i < qty; i++){
    var newCard = document.createElement('div');
    newCard.className = "card";
    newCard.setAttribute('data-card', cardPairs[i]);
    newCard.addEventListener('click', isTwoCards);
    boardMaker.appendChild(newCard);
    }
};

var isTwoCards = function(){
    cardsInPlay.push(this.getAttribute('data-card'));
    var label = this.getAttribute('data-card');
    this.innerHTML = '<p>' + label + '</p>';
    if (cardsInPlay.length === 2) {
        isMatch(cardsInPlay); // for some reason the timing of this isn't working like I thought it would. It's running the isMatch function before it's drawing the <p> tag
    }
};

var gameEnding = function () { // sorts the cards that have been matched from lowest to highest, then converts those from string to integer, then compares the 2 arrays.
    cardsMatched.sort(function(a,b){return a - b});
    cardsMatched=cardsMatched.map(Number);
    var isEqual = (JSON.stringify(cards) === JSON.stringify(cardsMatched));
    if (isEqual === true) {
      alert("Congratulations! You matched them all!");
    }
};
// TODO: get the <p> to clear just the unmatched carsd after no match. idea: for each cardsInPlay, for each cardPairs, if cardsInPlay = cardPairs[i], clear p tag.
var clearUnmatched = function () {
  for (var i = 0; i < cardPairs.length; i++){
    cardPairs[i].innerHTML = "<p></p>";
  }
};

var isMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    alert("You found a match!");
    cardsMatched.push(cardsInPlay[0]);
    cardsInPlay = [];
    gameEnding();
  } else {
    clearUnmatched();
  }
};

var startGame = function() {
  var askQty = prompt("How many pairs do you want to use", "2 or more");
  possibleCardsGenerator(askQty);
  cardPairs = shuffle(cardPairs);
  createBoard(askQty*2);
};

var startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);
// window.onload = askQty;
