var player = document.getElementById('player');
var gameBoard = document.getElementById('game-board');
var highScore = localStorage.getItem('highScore') || 0;
var highScoreName = localStorage.getItem('highScoreName') || '';
// Update high score display on page load
document.getElementById('high-score-name').textContent = "Name: " + highScoreName;
document.getElementById('high-score-value').textContent = "Score: " + highScore;

// Player movement
window.addEventListener('keydown', function(e) {
    var left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if(e.key == "ArrowLeft" && left > 0) {
        player.style.left = left - 30 + "px";
    }
    else if(e.key == "ArrowRight" && left <= 750) {
        player.style.left = left + 30 + "px";
    }
    if(e.key == " ") {
        shoot();
    }
});

var score = 0;
var time = 0;
var highScore = 0;
var highScoreName = '';


setInterval(function() {
    time++;
    document.getElementById('time').textContent = "Time: " + time;
}, 1000);

// Increase score when an invader is hit
function increaseScore() {
    score++;
    document.getElementById('score').textContent = "Score: " + score;
}

function checkHighScore() {
    if(score > highScore) {
        highScore = score;
        highScoreName = prompt('New high score! Please enter your name:');
        document.getElementById('high-score-name').textContent = "Name: " + highScoreName;
        document.getElementById('high-score-value').textContent = "Score: " + highScore;

        // Save high score and name to localStorage
        localStorage.setItem('highScore', highScore);
        localStorage.setItem('highScoreName', highScoreName);
    }
}

function shoot() {
    var bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = parseInt(window.getComputedStyle(player).getPropertyValue('left')) + 25 + "px";
    bullet.style.top = '550px';
    gameBoard.appendChild(bullet);

    var moveBullet = setInterval(function() {
        var invader = document.querySelector('.invader');
        if(invader != null) {
            var bulletTop = parseInt(window.getComputedStyle(bullet).getPropertyValue('top'));
            var invaderTop = parseInt(window.getComputedStyle(invader).getPropertyValue('top'));
            var invaderLeft = parseInt(window.getComputedStyle(invader).getPropertyValue('left'));
            var bulletLeft = parseInt(window.getComputedStyle(bullet).getPropertyValue('left'));

            if(bulletTop <= invaderTop + 50 && bulletTop > invaderTop) {
                if(bulletLeft >= invaderLeft && bulletLeft <= invaderLeft + 50) {
                    gameBoard.removeChild(invader);
                    gameBoard.removeChild(bullet);
                    clearInterval(moveBullet);
                    increaseScore();
                }
            }

            if(bulletTop <= 0) {
                gameBoard.removeChild(bullet);
                clearInterval(moveBullet);
            }
            else {
                bullet.style.top = bulletTop - 25 + "px";
            }
        }
    }, 250);
}

// Invader creation
var createInvaders = setInterval(function() {
    var invader = document.createElement('div');
    invader.classList.add('invader');
    invader.style.left = Math.floor(Math.random() * 750) + "px";
    invader.style.top = '0px';
    gameBoard.appendChild(invader);

    // Invader movement
    var moveInvader = setInterval(function() {
        var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        var invaderTop = parseInt(window.getComputedStyle(invader).getPropertyValue('top'));
        if(invaderTop >= 550) {
            if(invaderTop >= playerTop && invaderTop < playerTop + 50) {
                alert('Game Over');
                clearInterval(moveInvader);
                window.location.reload();
                checkHighScore(); // Check high score
            }
            gameBoard.removeChild(invader);
            clearInterval(moveInvader);
        }
        else {
            invader.style.top = invaderTop + 25 + "px";
        }
    }, 250);
}, 2000);