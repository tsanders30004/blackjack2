# Black Jack Instructions

1. Get cards put on the table by just putting <img> tags
in #dealer-hand and #player-hand linking to the images in the images directory.
2. Put two cards each on in the dealer's hands when The deal button is clicked.
3. Put one more card in the player's hand when the hit button is clicked.
4. Make a fake deck of cards
5. Simulate dealing cards from the deck.
6. Add up points for a hand.
7. Display points after each time cards are dealt.
8. Check for busts after each time cards are dealt.
9. When player stands, deal cards to dealer until he reaches 17 points.
10. When dealer's turn ends, determine winner.
11. When deal is clicked, start a new game.

## Challenges

* Calculate points for a hand correctly
* Display images for the cards
* create a new deck
* shuffle the deck

## Extra Credit

* Play the game with 3 decks of cards (156 cards) or six deck of cards (312 cards).
* Use an animation to reveal a card when it is drawn.
* Hide dealer's hole card, and reveal it before dealer's turn.
* Keep track of wins vs losses.
* Add betting structure instead of wins vs losses. The player with start out with a certain amount of money - say $500. There will be a minimum bet of $5. The player can choose an amount to bet before each hand.

## Card Objects and a Deck of Cards

A card has a point value and a suit. We will represent them as objects:

```
var kingOfHearts = { point: 13, suit: 'hearts' };
var aceOfDiamonds = { point: 1, suit: 'diamonds' };
```

A deck of cards is thus an array of these "card objects":

```
var deck = [
  { point: 13: suit: 'hearts' },
  { point: 1, suit: 'diamonds' },
  ...
];
```

Optional: You can develop this function using TDD by using the tests.html file.

## Challanges

### Challenge - Display the Card Images

We have images in the images folder with the following naming scheme:

```
<card name>_of_<suit>.png
```

For example:

```
5_of_hearts.png
ace_of_spades.png
jack_of_diamonds.png
```

In order to put a card visually on the page, we need to insert an `<img>` tag, example:

```
<img src="images/5_of_hearts.png" alt="5 of hearts"/>
```

We can use jQuery's append to append the `<img>` to the dealer's hand or the player's hand, example:

```
$('#dealer-hand').append('<img src="images/5_of_hearts.png"/>');
```

Except that we want to dynamically generate that `<img>` based on a card object, which is an object of the form: `{ point: 13: suit: 'hearts' }`.

Write a function getCardImageUrl(card). It will take a card object as its first argument, and it will return a string containing the correct image URL for that card. For example, with the following code:

```
var url = getCardImageUrl({ point: 13, suit: 'hearts' });
```

`url` should contain the string: "images/king_of_hearts.png".

Optional: develop this function using TDD using the tests.html and tests.js files.

Once the getCardImageUrl is working, use it to generate an `<img>` to append to the appropriate hand when cards are dealt in order to show the graphical cards.

#### Hints / Detailed Steps

1. make a function with `card` as a parameter: `function getCardImageUrl(card) {  }`
2. In the function
  3. make a variable called cardName.
  4. Use an if statement to test if card.points is 1, if so, set cardName to 'ace'. If card.points is 11, set cardName to 'jack'. Do similar for king and queen.
  5. Combine the strings 'images/', cardName, '_of_', card.suit, and '.png' by concatenating them with the + operator, store this in a variable called result.
  6. Return the result.

### Challenge - Calculate the points for a hand

Write a function calculatePoints(hand). It will take a hand array as its first argument, and it will return a number representing the correct point value for that hand. Rules:

1. Cards 10, Jack, Queen and King have 10 points.
2. Cards from 2-9 has the same points as their face value.
3. Extra credit: An Ace can either be 1 or 11 points, choose the highest value which does not result in a bust.

Optional: develop this function using TDD using the tests.html and tests.js files.

#### Hints / Detailed Steps

1. Write a function `calculatePoints` with `hand` as a parameter.
2. Inside the function
  3. Make a `points` variable and initialize it to zero. We will accumulate individual card points to this variable.
  4. Write a loop (while loop or for loop) to iterate through each hard in the `hand` array.
  5. Inside the loop, create a `card` variable and set it to `hand[i]` where `i` is the loop counter.
  6. Use an if statement to test if card.points is greater or equal to 10, if so add 10 to `points`
  7. Else add card.points to points
  8. Extra credit - you figure that out ;)

### Challenge - Create a Deck

Write a function `newDeck()` which creates a deck of the 52 standard poker cards as an array of card objects.

Optional: develop this function using TDD using the tests.html and tests.js files.

#### Hints / Detailed Steps

1. Write a function `newDeck` with no parameters.
2. Inside the function
  3. Create a variable call `deck` and initialize it to an empty array [].
  3. Write a while or for loop to loop from i = 1 to i = 13
  4. Inside the loop
    6. create an object with its `point` property equal to i and `suit` property equal to 'spades'.
    7. add the object to `deck`.
    6. create an object with its `point` property equal to i and `suit` property equal to 'hearts'.
    7. add the object to `deck`.
    6. create an object with its `point` property equal to i and `suit` property equal to 'clubs'.
    7. add the object to `deck`.
    6. create an object with its `point` property equal to i and `suit` property equal to 'diamonds'.
    7. add the object to `deck`.
  8. Return 'deck'

### Challenge - Shuffle a deck

Here are 3 strategies for shuffling a deck, but I am sure there are more:

1. take a random card from the old deck and put it on top of new deck until old deck is empty
2. take a card from top of old deck and put it in a random position of new deck till old deck is empty
3. swap the positions of two cards in the original deck some predetermined number of times (say 100).

If you take this challenge, you have to figure out the details yourself.
