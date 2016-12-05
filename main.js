console.log("JS file is connected to HTML! Woo!");
var cardPairs = [];
var cardsInPlay = [];
var cardsMatched = [];
var cards = [];
var boardMaker = document.getElementById('game-board');
var tries = 0;
var currentScore = document.getElementById('scoreDisplay');
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

function clearBoard () { //removes all existing game board children, resets the card value arrays and score
  tries = 0;
  cards = [];
  cardPairs = [];
  cardsMatched = [];
  cardsInPlay = [];
  document.getElementById('scoreDisplay').innerHTML="";
  var wipe = document.getElementById("game-board");
  while (wipe.firstChild) {
    wipe.removeChild(wipe.firstChild);
  }
}
var createBoard = function(qty) {  // creates a new div class="card" with the attribute of 'data-card' and a value from the randomized cardPairs array, runs the isTwoCards function on click then adds it as a child to the game-board div.
    for (var i = 0; i < qty; i++){
    var newCard = document.createElement('div');
    newCard.className = "card";
    newCard.setAttribute('data-card', cardPairs[i]);
    newCard.addEventListener('click', isTwoCards);
    boardMaker.appendChild(newCard);
    }
};

var isTwoCards = function(){ // stores the clicked card in the cardsInPlay array, adds a label to the card then if there are 2 cards in play, it calls the matching function
    cardsInPlay.push(this.getAttribute('data-card'));
    var label = this.getAttribute('data-card');
    this.innerHTML = '<p>' + label + '</p>';
    this.removeEventListener('click', isTwoCards); // makes the card unclickable again to avoid issues with clicking the same card twice
    if (cardsInPlay.length === 2) {
        isMatch(cardsInPlay);
    }
};

var gameEnding = function () { // sorts the cards that have been matched from lowest to highest, then converts those from string to integer, then compares the cards with cardsMatched.
    cardsMatched.sort(function(a,b){return a - b});
    cardsMatched = cardsMatched.map(Number);
    var isEqual = (JSON.stringify(cards) === JSON.stringify(cardsMatched));
    if (isEqual === true) {
      currentScore.className = "winner";
      currentScore.textContent = "YOU WON!! with " + tries + " tries";
    //   setTimeout(function() {
    //     alert("Congratulations! You matched them all in " + tries + " tries");
    // }, 100);
  }
};

var clearUnmatched = function () {
  var clear = document.querySelectorAll("[data-card]"); // grabs all data card nodes, for each card in play, test to see if any card matches the text content in it, if so, clear textContent.
  var cleared = 0;
  // while (cleared !== 2) { //trying to create a short circuit after it finds 2 things to clear but haven't figured it out yet
  for (var i = 0; i < cardsInPlay.length; i++) {
    for (var j = 0; j < cardPairs.length; j++)
      if (clear[j].textContent === cardsInPlay[i]) {
        clear[j].textContent = "";
        clear[j].addEventListener('click', isTwoCards);
        // cleared += 1;
      }
    }
  // }
  cardsInPlay = [];
  };


var isMatch = function() {  // tests the array to see if they are equal, if so then build array of matched cards then sees if you won, if not, clear the board of the unmatched cards.
    tries += 1;
    currentScore.className = "";
    currentScore.textContent = "Moves used: " + tries;
  if (cardsInPlay[0] === cardsInPlay[1]) {
    var makeInactive = document.querySelectorAll("[data-card]");
    cardsMatched.push(cardsInPlay[0]);
    for (var i = 0; i < cardPairs.length; i++) { //this makes the cards that are a successful match unclickable
      if (makeInactive[i].textContent === cardsInPlay[0]) {
        makeInactive[i].removeEventListener('click', isTwoCards);
      }
    }
    cardsInPlay = [];
    gameEnding();
  } else {
    setTimeout(clearUnmatched, 500); //this delay is so you can see what you clicked and can have a chance at memorizing it
  }
};

var startGame = function() {  //clears the board, asks how many pairs, generates that many, shuffles them, then creates the board.
  var askQty = document.getElementById("qty").value;
  clearBoard();
  if (askQty < 2) {
    alert("You need to enter a value of 2 or higher");
  } else {
  possibleCardsGenerator(askQty);
  cardPairs = shuffle(cardPairs);
  createBoard(askQty*2);
}
};
