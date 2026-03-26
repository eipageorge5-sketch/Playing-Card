// 1. Game State
let deck = [];
let currentCard = null;
let score = 0;

const suits = ['♥️', '♦️', '♣️', '♠️'];
const values = [
    { name: 'A', value: 14 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: 'J', value: 11 },
    { name: 'Q', value: 12 },
    { name: 'K', value: 13 }
];

// 2. Initialize Game
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let val of values) {
            deck.push({ ...val, suit: suit });
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function updateUI(card) {
    const display = document.getElementById('card-display');
    display.textContent = `${card.name}${card.suit}`;
    
    // Make Hearts and Diamonds RED
    if (card.suit === '♥️' || card.suit === '♦️') {
        display.style.color = 'red';
    } else {
        display.style.color = 'black';
    }

    document.getElementById('score').textContent = score;
    document.getElementById('cards-left').textContent = deck.length;
}

// 3. Game Logic
function makeGuess(guess) {
    if (deck.length === 0) {
        document.getElementById('message').textContent = "Game Over! Press Reset.";
        return;
    }

    const nextCard = deck.pop();
    const messageEl = document.getElementById('message');

    if (
        (guess === 'higher' && nextCard.value > currentCard.value) ||
        (guess === 'lower' && nextCard.value < currentCard.value)
    ) {
        score++;
        messageEl.textContent = "Correct! 🎉";
        messageEl.style.color = "#2ecc71"; // Green
    } else if (nextCard.value === currentCard.value) {
        messageEl.textContent = "It's a tie! No points.";
        messageEl.style.color = "#f1c40f"; // Yellow
    } else {
        messageEl.textContent = "Wrong! Better luck next time.";
        messageEl.style.color = "#e74c3c"; // Red
    }

    currentCard = nextCard;
    updateUI(currentCard);
}

function resetGame() {
    score = 0;
    createDeck();
    shuffleDeck();
    currentCard = deck.pop();
    updateUI(currentCard);
    document.getElementById('message').textContent = "New deck shuffled! Make your guess.";
    document.getElementById('message').style.color = "white";
}

// Start the game on load
resetGame();
