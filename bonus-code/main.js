console.log("JS file is connected to HTML! Woo!");
var cards = [];
var cardsInPlay = [];
var cardsMatched = [];
var toBeRemoved = [];
var possibleCardsGenerator = function (qty) {
  for (var i = 1; i <= qty; i++){
    cards.push(i,i);
  }
};
function shuffle(array) { //stole this from stackOverflow
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

var boardMaker = document.getElementById('game-board');

var createBoard = function(qty) {
    for (var i = 0; i < qty; i++){
    var newCard = document.createElement('div');
    newCard.className = "card";
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    boardMaker.appendChild(newCard);
    }
};

var isTwoCards = function(){
    cardsInPlay.push(this.getAttribute('data-card'));
    var label = this.getAttribute('data-card');
    this.innerHTML = '<p>' + label + '</p>';
    if (cardsInPlay.length === 2) {
        isMatch(cardsInPlay);
        cardsInPlay = [];
    }
};


var clearUnmatched = function () {
  for (var i = 0; i < cards.length; i++){
    cards[i].innerHTML = "<p></p>";
  }
};
var isMatch = function() {
  if (cardsInPlay[0] === cardsInPlay[1]) {
    alert("You found a match!");
    cardsMatched.push(cardsInPlay[0]);
    gameEnding();
  } else {
    clearUnmatched();
  }
};

var startGame = function() {
  var askQty = prompt("How many pairs do you want to use", "even numbers only");
  possibleCardsGenerator(askQty);
  cards = shuffle(cards);
  createBoard(askQty*2);
};

var startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);
// window.onload = askQty;
