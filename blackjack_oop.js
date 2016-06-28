"use strict";

var myDeck = new Deck;
var playerHand = new Hand('#player-hand');
var dealerHand = new Hand('#dealer-hand');

function Card(faceValue, suit) {
     this.faceValue      = faceValue;
     this.suit           = suit;
}

function Deck() {

     function createSuit (mySuit) {
          var setOfCardsForOneSuit = [];
          for (var i = 2; i <= 10; i++) {
               setOfCardsForOneSuit[i-2] = new Card(i, mySuit);
          }
          setOfCardsForOneSuit[9]  = new Card ('jack', mySuit);
          setOfCardsForOneSuit[10] = new Card ('queen', mySuit);
          setOfCardsForOneSuit[11] = new Card ('king', mySuit);
          setOfCardsForOneSuit[12] = new Card ('ace', mySuit);
          return setOfCardsForOneSuit;
     }

     this.cards = [];
     this.cards = createSuit('spades').concat(createSuit('clubs')).concat(createSuit('hearts')).concat(createSuit('diamonds'));
}

function Hand(tagID) {
     this.cards = [];
     this.tagID = tagID;
     this.dealCard = function(){
          var randomIndex = Math.floor((Math.random() * myDeck.cards.length) + 1) - 1; /* random number between 0 and 51 */
          var randomCard = myDeck.cards[randomIndex];
          this.cards.push(randomCard);
          myDeck.cards.splice(randomIndex, 1);

          /* while we're at it, show the cards on the table... */
          var cardHTML = '<div class="card animated fadeIn rotateIn">'
          + '<img class="newCard" src="images/'
          + randomCard.faceValue + '_of_' + randomCard.suit
          +'.png" height="80" width="60">'
          + '</div>';

          // var imageFilename = 'images/' + randomCard.point + '_of_' + randomCard.suit +'.png';
          // console.log(imageFilename);

          $(tagID).append(cardHTML);

     };
     this.calculatePoints = function(){
          var sum = 0;
          var points = 0;
          var aceFound = false;
          var numAces = 0;
          for (var i = 0; i < this.cards.length; i++) {
               /* convert jack, queen, and king to ten points */
               if (this.cards[i].faceValue === 'jack' || this.cards[i].faceValue === 'queen' || this.cards[i].faceValue === 'king' ) {
                    points = 10;
                    /* use face value points for numbered cards 2, 3, ..., 10 */
               } else if (this.cards[i].faceValue !== 'ace') {
                    points = this.cards[i].faceValue;
               }
               /* at most, only one ace can be counted as an 11.  (Two aces counted as 11 would equal 22; bust.
               therefore, need to count how many aces are in the hand. */
               if (this.cards[i].faceValue === 'ace') {
                    aceFound = true;
                    numAces++;
                    points = 0;    /* don't count aces yet... */
               }
               sum += points;
          };
          if (aceFound) {
               /*   we can count no more than one ace as an eleven since 2+ aces would make the hand > 22 --- bust.
               therefore, increase the sum to (numAces-1) and then figure out if we should count the other one as a 1 or 11. */
               sum += numAces - 1;

               /* now, figure out if the remaining ace should be counnted as a 1 or 11 */

               if (sum < 11) {
                    sum += 11;     /* count as eleven */
               } else {
                    sum++;         /* count as one */
               };
          };
          return sum;
     };
}

function displayPoints() {
     var dealerPoints = dealerHand.calculatePoints();
     $('#dealer-points').text(dealerPoints);
     var playerPoints = playerHand.calculatePoints();
     $('#player-points').text(playerPoints);
};

function checkForBusts() {
     var playerPoints = playerHand.calculatePoints();
     if (playerPoints > 21) {
          $('#messages').text('Dealer Wins...');
          return true;
     }
     var dealerPoints = dealerHand.calculatePoints();
     if (dealerPoints > 21) {
          $('#messages').text('You Win!');
          return true;
     }
     return false;
};

function resetGame() {
     myDeck = new Deck;
     playerHand = new Hand('#player-hand');
     dealerHand = new Hand('#dealer-hand');
     $('#player-points').text('');
     $('#dealer-points').text('');
     $('#messages').text('');
     $('#player-hand').html('');
     $('#dealer-hand').html('');
}

$(document).ready(function(){

     $('#deal-button').click(function(){
          /* start with a new deck and empty player & dealer hands. */
          resetGame();

          /* deal two each to the player and dealer */
          playerHand.dealCard();
          dealerHand.dealCard();
          playerHand.dealCard();
          dealerHand.dealCard();

          displayPoints();

          checkForBusts();
     });

     $('#hit-button').click(function () {
          playerHand.dealCard();
          displayPoints();
          checkForBusts();
     });

     /* ----------------------------------------------------------- */
     $('#stand-button').click(function () {
          var dealerPoints = dealerHand.calculatePoints();
          while (dealerPoints < 17) {
               dealerHand.dealCard();
               dealerPoints = dealerHand.calculatePoints();
          }
          displayPoints();
          if (!checkForBusts()) {
               // determine the winner
               var playerPoints = playerHand.calculatePoints();
               var dealerPoints = dealerHand.calculatePoints();
               if (playerPoints > dealerPoints) {
                    $('#messages').text('You Win!');
               } else if (playerPoints === dealerPoints) {
                    $('#messages').text('Tie');
               } else {
                    $('#messages').text('Dealer Wins...');
               }
          }

     });

}); /* should be last in the file. */
