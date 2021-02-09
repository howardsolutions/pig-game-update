'use strict';

// select elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice')
const rollBtn = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')
const newBtn = document.querySelector('.btn--new')
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const player0Name = document.getElementById('name--0')
const player1Name = document.getElementById('name--1')

// Initial condition 
let scores, currentScore, activePlayer, playing

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0
    score1.textContent = 0
    current0.textContent = 0
    current1.textContent = 0
    
    diceEl.classList.add('hidden') 
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
} 

init()

///////////////////////////////////////////
//////// Game functionality //////////////

//////////////////////////////////////////
// ROLL BTN
/////////////////////////////////////////

rollBtn.addEventListener('click', () => {
    if (playing) {
        diceEl.classList.remove('hidden')

        // 1. getting random dice number
        let dice = Math.trunc(Math.random() * 6 + 1);
        
        // 2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. if dice = 1, switch player
        if (dice !== 1) {
            // add global score to current score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // switch player if dice == 1 
            switchPLayer()
        }
    }
})

// switch to the next player 
const switchPLayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    // change style active of player 
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

/////////////////////////////////////////////
// HOLD BTN 
////////////////////////////////////////////

holdBtn.addEventListener('click', () => {
    // 1. Add current score to active player's score
    // ex: scores[0] = scores[0] + currentScore
    if (playing) {
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        diceEl.classList.add('hidden')
    
        // 2. check if score >= 50 => add "winner status" to active player win the game
        // if not => switch the next player 
        if(scores[activePlayer] >= 50) {
            // finish the game
            playing = false;
    
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
    
            document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
    
        } else {
            switchPLayer()
        }
    }
})

/////////////////////////////////////////////
// Reset BTN 
////////////////////////////////////////////

newBtn.addEventListener('click', init)

