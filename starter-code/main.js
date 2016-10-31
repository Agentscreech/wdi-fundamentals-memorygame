console.log("JS file is connected to HTML! Woo!");
// var cardOne = "queen";
// var cardTwo = "queen";
// var cardThree = "king";
// var cardFour = "king";



var cards = ['queen', 'queen', 'king', 'king'];

var cardsInPlay = [];


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
var isMatch = function() {
    if (cardsInPlay[0] === cardsInPlay[1]) {
        alert("You found a match!");
    }else{
        alert("Sorry, Try again");
        }
};

var isTwoCards = function(){
    cardsInPlay.push(this.getAttribute('data-card'));
    if (this.getAttribute('data-card') === "king") {
        this.innerHTML = '<img src="king.png">';
    } else {
        this.innerHTML = '<img src="queen.png">';
    }
    if (cardsInPlay.length === 2) {
        isMatch(cardsInPlay);
        cardsInPlay = [];
    }
};
// var askQty = prompt("How many pairs do you want to use", "even numbers only, 2-52");
//
// window.onload = askQty;

createBoard(4);
