// Card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack",
"Ten", "Nine", "Eight", "Seven",
"Six", "Five", "Four", "Three", "Two"];

// DOM variables
let dealerHand = document.getElementById("dealer-cards");
let dealerScore = document.getElementById("dealer-score");
let playerHand = document.getElementById("player-cards");
let playerScore = document.getElementById("player-score");
let dealButton = document.getElementById("deal-button");
let hitButton = document.getElementById("hit-button");
let standButton = document.getElementById("stand-button");

// Game variables
let deck = [];
let dealerCards = [];
let playerCards = [];

// Create deck of cards
function createDeck() {
deck = [];
for (let suit of suits) {
for (let value of values) {
let card = {
suit: suit,
value: value
};
deck.push(card);
}
}
shuffleDeck();
}

// Shuffle deck of cards
function shuffleDeck() {
for (let i = deck.length - 1; i > 0; i--) {
let j = Math.floor(Math.random() * (i + 1));
[deck[i], deck[j]] = [deck[j], deck[i]];
}
}

// Deal initial cards
function dealCards() {
dealerCards = [getNextCard(), getNextCard()];
playerCards = [getNextCard(), getNextCard()];
showCards();
}

// Get the next card from the deck
function getNextCard() {
return deck.shift();
}

// Show cards on the table
function showCards() {
dealerHand.innerHTML = "";
playerHand.innerHTML = "";

for (let card of dealerCards) {
let cardDiv = document.createElement("div");
cardDiv.textContent = card.value + " of " + card.suit;
dealerHand.appendChild(cardDiv);
}
dealerScore.textContent = "Score: " + getScore(dealerCards);

for (let card of playerCards) {
let cardDiv = document.createElement("div");
cardDiv.textContent = card.value + " of " + card.suit;
playerHand.appendChild(cardDiv);
}
playerScore.textContent = "Score: " + getScore(playerCards);
}

// Calculate the score of a hand
function getScore(cards) {
let score = 0;
let hasAce = false;
for (let card of cards) {
if (card.value === "Ace") {
score += 11;
hasAce = true;
} else if (card.value === "King" || card.value === "Queen" || card.value === "Jack") {
score += 10;
} else {
score += parseInt(card.value);
}
}
if (hasAce && score > 21) {
score -= 10;
}
return score;
}

// Event listeners
dealButton.addEventListener("click", function() {
createDeck();
dealCards();
dealButton.disabled = true;
hitButton.disabled = false;
standButton.disabled = false;
});

hitButton.addEventListener("click", function() {
playerCards.push(getNextCard());
showCards();
if (getScore(playerCards) > 21) {
endGame();
}
});

standButton.addEventListener("click", function() {
while (getScore(dealerCards) < 17) {
dealerCards.push(getNextCard());
}
showCards();
endGame();
});

// End the game and determine the winner
function endGame() {
dealButton.disabled = false;
hitButton.disabled = true;
standButton.disabled = true;

let dealerScoreValue = getScore(dealerCards);
let playerScoreValue = getScore(playerCards);

if (dealerScoreValue > 21) {
alert("Dealer busts! You win!");
} else if (playerScoreValue > 21) {
alert("You bust! Dealer wins!");
} else if (dealerScoreValue > playerScoreValue) {
alert("Dealer wins!");
} else if (dealerScoreValue < playerScoreValue) {
alert("You win!");
} else {
alert("It's a tie!");
}
}

// Start the game
createDeck();