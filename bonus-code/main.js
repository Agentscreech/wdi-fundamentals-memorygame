console.log("JS file is connected to HTML! Woo!");
var cardPairs = [];
var cardsInPlay = [];
var cardsMatched = [];
var toBeRemoved = [];
var cards = [];
var boardMaker = document.getElementById('game-board');
var tries = 0;
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

function clearBoard () { //removes all existing game board children and resets the card value arrays and score
  tries = 0;
  cards = [];
  cardPairs = [];
  var wipe = document.getElementById("game-board");
  while (wipe.firstChild) {
    wipe.removeChild(wipe.firstChild);
  }
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

var isTwoCards = function(){ // adds a label to the card then if there are 2 cards in play, it calls the matching function
    tries += 0.5;
    cardsInPlay.push(this.getAttribute('data-card'));
    var label = this.getAttribute('data-card');
    this.innerHTML = '<p>' + label + '</p>';
    if (cardsInPlay.length === 2) {
        isMatch(cardsInPlay);
    }
};

var gameEnding = function () { // sorts the cards that have been matched from lowest to highest, then converts those from string to integer, then compares the 2 arrays.
    cardsMatched.sort(function(a,b){return a - b});
    cardsMatched=cardsMatched.map(Number);
    var isEqual = (JSON.stringify(cards) === JSON.stringify(cardsMatched));
    if (isEqual === true) {
      setTimeout(function() {
        alert("Congratulations! You matched them all in " + tries + " tries");
    }, 100);
  }
};

var clearUnmatched = function () {
  var clear = document.querySelectorAll("[data-card]"); // grabs all data cards nodes, for each card in play, test to see if any card matches the text content in it, if so, clear textContent.
  for (var i = 0; i < cardsInPlay.length; i++) {
    for (var j = 0; j < cardPairs.length; j++)
      if (clear[j].textContent === cardsInPlay[i]) {
        clear[j].textContent = "";
      }
    }
  cardsInPlay = [];
  };


var isMatch = function() {  // tests the array to see if they are equal, if not, clear the board.
  if (cardsInPlay[0] === cardsInPlay[1]) {
    // setTimeout(function() {
    //   alert("You found a match!");
    // }, 50);
    cardsMatched.push(cardsInPlay[0]);
    cardsInPlay = [];
    gameEnding();
  } else {
    // setTimeout(function() {
    //   alert("Sorry, not a match. Try again!");
    // }, 50);
    setTimeout(clearUnmatched, 500);
    // clearUnmatched();
  }
};

var startGame = function() {  //clears the board, asks how many pairs, generates that many, shuffles them, then creates the board.
  clearBoard();
  var askQty = prompt("How many pairs do you want to use", "2 or more");
  possibleCardsGenerator(askQty);
  cardPairs = shuffle(cardPairs);
  createBoard(askQty*2);
};

var startButton = document.getElementById('start');
startButton.addEventListener('click', startGame);
