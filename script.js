function drawCard() {
    const suits = [
        { name: 'hearts', symbol: '♥️' },
        { name: 'diamonds', symbol: '♦️' },
        { name: 'spades', symbol: '♠️' },
        { name: 'clubs', symbol: '♣️' }
    ];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let deck = [];

    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];

    // Create the card element
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${randomSuit.name}`;
    
    cardDiv.innerHTML = `
        <div class="rank">${randomRank}</div>
        <div class="suit-center">${randomSuit.symbol}</div>
        <div class="rank" style="transform: rotate(180deg);">${randomRank}</div>
    `;

    // Add it to the screen
    document.getElementById('deck-container').appendChild(cardDiv);
}
