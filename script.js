let deck = [];
let currentCard = null;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const suits = ['♥️', '♦️', '♣️', '♠️'];
const values = [
    { name: 'A', val: 14 }, { name: '2', val: 2 }, { name: '3', val: 3 },
    { name: '4', val: 4 }, { name: '5', val: 5 }, { name: '6', val: 6 },
    { name: '7', val: 7 }, { name: '8', val: 8 }, { name: '9', val: 9 },
    { name: '10', val: 10 }, { name: 'J', val: 11 }, { name: 'Q', val: 12 }, { name: 'K', val: 13 }
];

function resetGame() {
    score = 0;
    deck = [];
    suits.forEach(s => values.forEach(v => deck.push({...v, suit: s})));
    
    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    currentCard = deck.pop();
    updateUI();
    document.getElementById('message').textContent = "New deck! Higher or Lower?";
}

function updateUI() {
    const display = document.getElementById('card-display');
    display.textContent = `${currentCard.name}${currentCard.suit}`;
    display.style.color = (currentCard.suit === '♥️' || currentCard.suit === '♦️') ? 'red' : 'black';
    
    document.getElementById('score').textContent = score;
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('cards-left').textContent = deck.length;
}

function makeGuess(guess) {
    if (deck.length === 0) return;

    const nextCard = deck.pop();
    const display = document.getElementById('card-display');
    const msg = document.getElementById('message');

    display.classList.remove('correct-pop', 'shake');
    void display.offsetWidth; // Reset animation

    if ((guess === 'higher' && nextCard.val > currentCard.val) || 
        (guess === 'lower' && nextCard.val < currentCard.val)) {
        score++;
        display.classList.add('correct-pop');
        msg.textContent = "Correct! 🎉";
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
    } else if (nextCard.val === currentCard.val) {
        msg.textContent = "Tie! No points.";
    } else {
        display.classList.add('shake');
        msg.textContent = "Wrong! Game Over.";
        // score = 0; // Uncomment to reset score on mistake
    }

    currentCard = nextCard;
    updateUI();
}

resetGame(); // Start first game
