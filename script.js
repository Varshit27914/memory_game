// script.js
let sequence = [];
let userSequence = [];
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.getElementById('high-score').innerText = `High Score: ${highScore}`;
const gridButtons = document.querySelectorAll('.grid-btn');

// Get audio elements
const lightUpSound = document.getElementById('light-up-sound');
const pressSound = document.getElementById('press-sound');
const gameOverSound = document.getElementById('game-over-sound');

function startGame() {
    sequence = [];
    userSequence = [];
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('message').innerText = '';
    nextRound();
}

function nextRound() {
    disableButtons();
    userSequence = [];
    sequence.push(Math.floor(Math.random() * 9));
    lightUpSequence();
}

function lightUpSequence() {
    let i = 0;
    const interval = setInterval(() => {
        if (i > 0) {
            gridButtons[sequence[i - 1]].classList.remove('active');
        }
        if (i >= sequence.length) {
            clearInterval(interval);
            enableButtons();
        } else {
            gridButtons[sequence[i]].classList.add('active');
            lightUpSound.play(); // Play light up sound
            i++;
        }
    }, 300); // Faster interval (300ms)
}

function disableButtons() {
    gridButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('active', 'pressed');
    });
}

function enableButtons() {
    gridButtons.forEach(btn => btn.disabled = false);
}

function handleUserInput(index) {
    userSequence.push(index);
    gridButtons[index].classList.add('pressed');
    pressSound.play(); // Play press sound
    setTimeout(() => gridButtons[index].classList.remove('pressed'), 200);

    if (sequence[userSequence.length - 1] !== userSequence[userSequence.length - 1]) {
        loseGame();
    } else if (userSequence.length === sequence.length) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        nextRound();
    }
}

function loseGame() {
    disableButtons();
    gameOverSound.play(); // Play game over sound
    document.getElementById('message').innerText = `You lose! Your score was: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').innerText = `High Score: ${highScore}`;
    }
}

gridButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleUserInput(index));
});

document.getElementById('start-btn').addEventListener('click', startGame);
