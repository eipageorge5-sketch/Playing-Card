// 1. Move data outside the function so it doesn't reset every click
const suits = [
    { name: 'hearts', symbol: '♥️' },
    { name: 'diamonds', symbol: '♦️' },
    { name: 'spades', symbol: '♠️' },
    { name: 'clubs', symbol: '♣️' }
];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

let deck = [];

// 2. Function to build a fresh deck of 52 unique cards
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ rank, suit });
        }
    }
}

// 3. The Fisher-Yates Shuffle (The gold standard for randomness)
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
}

// 4. Draw Logic
function drawCard() {
    if (deck.length === 0) {
        alert("Deck is empty! Please reshuffle.");
        return;
    }

    // Take the top card off the deck
    const cardData = deck.pop(); 
    updateCounter();

    // Create the element
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${cardData.suit.name}`;
    
    cardDiv.innerHTML = `
        <div class="rank">${cardData.rank}</div>
        <div class="suit-center">${cardData.suit.symbol}</div>
        <div class="rank" style="transform: rotate(180deg);">${cardData.rank}</div>
    `;

    document.getElementById('deck-container').appendChild(cardDiv);
}

// 5. Utility Functions
function updateCounter() {
    document.getElementById('card-count').innerText = deck.length;
}

function resetGame() {
    document.getElementById('deck-container').innerHTML = '';
    createDeck();
    shuffleDeck();
    updateCounter();
}

// Initialize the game on load
resetGame();
document.getElementById('draw-btn').addEventListener('click', drawCard);
document.getElementById('shuffle-btn').addEventListener('click', resetGame);
