
var deck = [];

var dealerHand = [];
var playerHand = [];

function resetGame() {
     deck = [
          { point: 2, suit: 'diamonds'},
          { point: 3, suit: 'diamonds'},
          { point: 4, suit: 'diamonds'},
          { point: 5, suit: 'diamonds'},
          { point: 6, suit: 'diamonds'},
          { point: 7, suit: 'diamonds'},
          { point: 8, suit: 'diamonds'},
          { point: 9, suit: 'diamonds'},
          { point: 10, suit: 'diamonds'},
          { point: 'jack', suit: 'diamonds'},
          { point: 'queen', suit: 'diamonds'},
          { point: 'king', suit: 'diamonds'},
          { point: 'ace', suit: 'diamonds'},
          { point: 2, suit: 'hearts'},
          { point: 3, suit: 'hearts'},
          { point: 4, suit: 'hearts'},
          { point: 5, suit: 'hearts'},
          { point: 6, suit: 'hearts'},
          { point: 7, suit: 'hearts'},
          { point: 8, suit: 'hearts'},
          { point: 9, suit: 'hearts'},
          { point: 10, suit: 'hearts'},
          { point: 'jack', suit: 'hearts'},
          { point: 'queen', suit: 'hearts'},
          { point: 'king', suit: 'hearts'},
          { point: 'ace', suit: 'hearts'},
          { point: 2, suit: 'clubs'},
          { point: 3, suit: 'clubs'},
          { point: 4, suit: 'clubs'},
          { point: 5, suit: 'clubs'},
          { point: 6, suit: 'clubs'},
          { point: 7, suit: 'clubs'},
          { point: 8, suit: 'clubs'},
          { point: 9, suit: 'clubs'},
          { point: 10, suit: 'clubs'},
          { point: 'jack', suit: 'clubs'},
          { point: 'queen', suit: 'clubs'},
          { point: 'king', suit: 'clubs'},
          { point: 'ace', suit: 'clubs'},
          { point: 2, suit: 'spades'},
          { point: 3, suit: 'spades'},
          { point: 4, suit: 'spades'},
          { point: 5, suit: 'spades'},
          { point: 6, suit: 'spades'},
          { point: 7, suit: 'spades'},
          { point: 8, suit: 'spades'},
          { point: 9, suit: 'spades'},
          { point: 10, suit: 'spades'},
          { point: 'jack', suit: 'spades'},
          { point: 'queen', suit: 'spades'},
          { point: 'king', suit: 'spades'},
          { point: 'ace', suit: 'spades'}
     ];

     dealerHand = [];
     playerHand = [];
     $('#player-points').text('');
     $('#dealer-points').text('');
     $('#messages').text('');
     $('#player-hand').html('');
     $('#dealer-hand').html('');
}

function dealCard(hand, element) {
     /* original code */
     // var card = deck.pop();
     // hand.push(card);

     /* want to randomly choose a card from desk, push to hand, and remove from deck. */
     var randomIndex = Math.floor((Math.random() * deck.length) + 1) - 1; /* should be between 0 and num cards - 1 */
     var randomCard = deck[randomIndex];
     hand.push(randomCard);
     deck.splice(randomIndex, 1);

     var cardHTML = '<div class="card animated fadeIn rotateIn">'
     + '<img class="newCard" src="images/'
     + randomCard.point + '_of_' + randomCard.suit
     +'.png" height="80" width="60">'
     + '</div>';

     var imageFilename = 'images/' + randomCard.point + '_of_' + randomCard.suit +'.png';
     console.log(imageFilename);

     $(element).append(cardHTML);

     // $(".newCard").hide().fadeIn(5000);
}

/*
calculatePoints - takes a hand (array of cards) and returns
the point value of that hand.
*/
function calculatePoints(hand) {
     var sum = 0;
     var points = 0;
     var aceFound = false;
     var numAces = 0;

     for (var i = 0; i < hand.length; i++) {
          /* convert jack, queen, and king to ten points */
          if (hand[i].point === 'jack' || hand[i].point === 'queen' || hand[i].point === 'king') {
               points = 10;
               /* add points for face-value cards */
          } else if (hand[i].point !== 'ace') {
               points = hand[i].point;
          }
          if (hand[i].point === 'ace') {
               aceFound = true;
               numAces++;
               points = 0;
          }
          sum += points;
     }
     if (aceFound) {
          for (i = 1; i <= numAces; i++) {
               if (sum < 11) {
                    sum += 11;
               }
               else {
                    sum++;
               }
          }
     }
     return sum;
}

/*
displayPoints - calculate the points using calculatePoints for both the dealer and player. And it will update the display with those points #dealer-points and #player-points.
*/
function displayPoints() {
     var dealerPoints = calculatePoints(dealerHand);
     $('#dealer-points').text(dealerPoints);
     var playerPoints = calculatePoints(playerHand);
     $('#player-points').text(playerPoints);
}

/*
checkForBusts - get points using calculatePoints function for both the dealer and player, and display message when someone busts. Returns true if there was a bust, and false otherwise.
*/
function checkForBusts() {
     var playerPoints = calculatePoints(playerHand);
     if (playerPoints > 21) {
          $('#messages').text('You busted. Better luck next time!');
          return true;
     }
     var dealerPoints = calculatePoints(dealerHand);
     if (dealerPoints > 21) {
          $('#messages').text('Dealer busted. You win!');
          return true;
     }
     return false;
}

$(function () {

     $('#deal-button').click(function () {
          resetGame();
          dealCard(playerHand, '#player-hand');
          dealCard(dealerHand, '#dealer-hand');
          dealCard(playerHand, '#player-hand');
          dealCard(dealerHand, '#dealer-hand');
          displayPoints();
          checkForBusts();
     });

     $('#hit-button').click(function () {
          dealCard(playerHand, '#player-hand');
          displayPoints();
          checkForBusts();
     });

     $('#stand-button').click(function () {
          var dealerPoints = calculatePoints(dealerHand);
          while (dealerPoints < 17) {
               dealCard(dealerHand, '#dealer-hand');
               dealerPoints = calculatePoints(dealerHand);
          }
          displayPoints();
          if (!checkForBusts()) {
               // determine the winner
               var playerPoints = calculatePoints(playerHand);
               var dealerPoints = calculatePoints(dealerHand);
               if (playerPoints > dealerPoints) {
                    $('#messages').text('You won!');
               } else if (playerPoints === dealerPoints) {
                    $('#messages').text('Push');
               } else {
                    $('#messages').text('You lose!');
               }
          }

     });

});
