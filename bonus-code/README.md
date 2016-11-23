# wdi-fundamentals-memorygame

Memory Game: Unit Homework for WDI Fundamentals

In order to apply JavaScript concepts covered in the [pre-work](http://fundamentals.generalassemb.ly/), all pre-work lessons will work towards building a memory game app. Your development of this game will exercise your ability to implement logic with JavaScript and so much more! Besides following the prompts, you should feel free to be creative and add to the code - make this game your own!

________________________________________________

I've added quite a few things.

There is a button that starts the game.  It'll ask for how many pairs you want to deal with, create that many pairs of cards and assign a number to those cards displayed in a random order.  If you click it again, it will erase the board and create a new set of cards based on the next input.

From there, you can click on the card.  It will reveal the number it was assigned.  When you click on a second card, if it doesn't match the first card, it hides the numbers after a short delay on both cards, but only on the ones you clicked on, not the ones that have correctly been matched.  

Once they all have been matched, you get a notification that tells you you've won and in how many tries it took you.

_________________________________________________
V1 patch notes.

* fixed a bug where you would only get a victory notification on the first game
* fixed a bug that would allow you to end the game with x.5 tries
* fixed a bug where you could just click on the same card twice and would be considered a match
* fixed a bug where it would clear matched pairs if you clicked on a matched pair card before a new card
* fixed links to github and twitter
* added test to make sure you get more than one pair and continues to prompt until 2 or more is entered.
