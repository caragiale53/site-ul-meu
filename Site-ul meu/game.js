const board = document.getElementById("board");
const startBtn = document.getElementById("start");

const levelText = document.getElementById("level");
const movesText = document.getElementById("moves");
const timeText = document.getElementById("time");

let numbers = [];
let moves = 0;
let level = 1;
let seconds = 0;
let timer;

function createBoard() {
    board.innerHTML = "";

    numbers.forEach((num, index) => {
        let tile = document.createElement("div");
        tile.className = "tile";

        if (num !== 0) {
            tile.textContent = num;
            tile.onclick = () => moveTile(index);
        }

        board.appendChild(tile);
    });
}

function generatePuzzle() {
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

    for (let i = 0; i < 100; i++) {
        let empty = numbers.indexOf(0);
        let possible = [];

        if (empty >= 4) possible.push(empty - 4);
        if (empty < 12) possible.push(empty + 4);
        if (empty % 4 !== 0) possible.push(empty - 1);
        if (empty % 4 !== 3) possible.push(empty + 1);

        let randomMove = possible[Math.floor(Math.random() * possible.length)];

        [numbers[empty], numbers[randomMove]] =
        [numbers[randomMove], numbers[empty]];
    }
}

function moveTile(index) {

    let empty = numbers.indexOf(0);

    let canMove =
        index === empty - 1 ||
        index === empty + 1 ||
        index === empty - 4 ||
        index === empty + 4;

    if (canMove) {

        [numbers[index], numbers[empty]] =
        [numbers[empty], numbers[index]];

        moves++;

        movesText.textContent = moves;

        createBoard();

        checkWin();
    }
}

function checkWin() {

    let win = true;

    for(let i = 0; i < 15; i++) {
        if(numbers[i] !== i + 1) {
            win = false;
        }
    }

    if(win) {
        clearInterval(timer);

        alert("🎉 Bravo! Ai terminat nivelul!");

        level++;

        if(level > 100) {
            alert("🏆 Ai terminat toate nivelurile!");
            level = 100;
        }

        levelText.textContent = level;

        startGame();
    }
}


function startGame() {

    moves = 0;
    seconds = 0;

    movesText.textContent = moves;
    timeText.textContent = seconds;

    generatePuzzle();
    createBoard();

    clearInterval(timer);

    timer = setInterval(() => {
        seconds++;
        timeText.textContent = seconds;
    },1000);
}


startBtn.onclick = startGame;