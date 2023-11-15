var blockSize = 15;
var rows = 20;
var cols = 20;
var board;
var context;
var gameOver = false;
var difficulty = "normal";
// snake
var snakeX = blockSize;
var snakeY = blockSize;
var snakeBody = [];

//food
var foodX;
var foodY;

/* getDirection */
var positionX = 0;
var positionY = 0;

let difficiltiesBtn = document.querySelectorAll(".dif");

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    foodPlace();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000 / 5);
}

/* document.querySelectorAll('.dif').forEach(function (button) {
    button.addEventListener('click', function () {
        e = button.
            difficulty = this.innerText.toLowerCase();
    });
}); */

difficiltiesBtn.forEach(button => {
    button.addEventListener("click", () => {
        e = button.value;
        difficulty = getSpeedMultiplier(e);
    });
});


function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        foodPlace();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += positionX * blockSize;
    snakeY += positionY * blockSize;

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    if (snakeX < 0 ||
        snakeY < 0 ||
        snakeX > cols * blockSize ||
        snakeY > rows * blockSize) {
        alert("game over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert("game over");
        }
    }
}

function foodPlace() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && positionY != 1) {
        positionX = 0;
        positionY = -1;
    }
    else if (e.code == "ArrowDown" && positionY != -1) {
        positionX = 0;
        positionY = 1;
    }
    else if (e.code == "ArrowLeft" && positionX != 1) {
        positionX = -1;
        positionY = 0;
    }
    else if (e.code == "ArrowRight" && positionX != -1) {
        positionX = 1;
        positionY = 0;
    }

    snakeX += positionX * blockSize;
    snakeY += positionY * blockSize;
}

function getSpeedMultiplier(difficulty) {
    if (difficulty === "easy") {
        return 0.5; // ajuste la vitesse pour le niveau facile
    } else if (difficulty === "hard") {
        return 1.5; // ajuste la vitesse pour le niveau difficile
    } else {
        return 1; // niveau normal, pas de modification de vitesse
    }
}

/*

function isGameOver() {
    return (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX > cols * blockSize ||
        snakeY > rows * blockSize ||
        checkCollisionWithBody()
    );
}

function checkCollisionWithBody() {
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    var gameOverMessage = document.getElementById("gameOverMessage");
    gameOverMessage.innerHTML = "Game Over";
    gameOverMessage.style.display = "block";
}
 */
