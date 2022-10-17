var gameState = 'start';
var text = document.querySelector('.text');
// players scores
var p1_score = document.querySelector('.p1_score');
var p2_score = document.querySelector('.p2_score');
// player paddles
var pr1 = document.querySelector('.pr1');
var pr2 = document.querySelector('.pr2');
var p_common = document.querySelector('.paddle').getBoundingClientRect();
// game board
var board = document.querySelector('.board');
// moving box
var box = document.querySelector('.box');
var initial_box = document.querySelector('.box');
// direction variables
var dx = Math.floor(Math.random() * 5) + 3;
var dy = Math.floor(Math.random() * 5) + 3;
var dxd = Math.floor(Math.random() * 3);
var dyd = Math.floor(Math.random() * 3);

// players coordinates
var pr1_coord = pr1.getBoundingClientRect();
var pr2_coord = pr2.getBoundingClientRect();
// box coordinates
var initial_box_coord = box.getBoundingClientRect();
var box_coord = initial_box_coord;
// gameboard coordinates
var board_coord = board.getBoundingClientRect();
var entermsg = document.getElementById("#enter_msg");
// game sounds
const gameSound = new Audio("sounds/sound.mp3");
const gameSound1 = new Audio("sounds/wallhit.mp3");
const gameSound2 = new Audio("sounds/boxhit.mp3");

function moveBox(dx, dy, dxd, dyd) {
    if (box_coord.top <= board_coord.top) {
        dyd = 1;
        gameSound2.play();
    }
    if (box_coord.bottom >= board_coord.bottom) {
        dyd = 0;
        gameSound2.play();
    }
    if (
        box_coord.left <= pr1_coord.right &&
        box_coord.top >= pr1_coord.top &&
        box_coord.bottom <= pr1_coord.bottom
    ) {
        dxd = 1;
        dx = Math.floor(Math.random() * 5) + 3;
        dy = Math.floor(Math.random() * 5) + 3;
        gameSound2.play();
    }
    if (
        box_coord.right >= pr2_coord.left &&
        box_coord.top >= pr2_coord.top &&
        box_coord.bottom <= pr2_coord.bottom
    ) {
        dxd = 0;
        dx = Math.floor(Math.random() * 5) + 3;
        dy = Math.floor(Math.random() * 5) + 3;
        gameSound2.play();
    }
    if (
        box_coord.left <= board_coord.left ||
        box_coord.right >= board_coord.right

    ) {
        gameSound1.play();
        if (box_coord.left <= board_coord.left) {
            p2_score.innerHTML = +p2_score.innerHTML + 1;

        }
         else {
            p1_score.innerHTML = +p1_score.innerHTML + 1;
        }

        gameState = 'start';
        box_coord = initial_box_coord;
        box.style = initial_box.style;
        text.innerHTML = 'PLAYER SCORES !';
        return;
    }
    box.style.top = box_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
    box.style.left = box_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    box_coord = box.getBoundingClientRect();
    requestAnimationFrame(() => {
        moveBox(dx, dy, dxd, dyd);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        gameState = gameState == 'start' ? 'play' : 'start';
        if (gameState == 'play') {
            text.innerHTML = 'GAME STARTED';
            requestAnimationFrame(() => {
                dx = Math.floor(Math.random() * 5) + 3;
                dy = Math.floor(Math.random() * 5) + 3;
                dxd = Math.floor(Math.random() * 3);
                dyd = Math.floor(Math.random() * 3);
                moveBox(dx, dy, dxd, dyd);
            });
            gameSound.play();
        }
    }
    if (gameState == 'play') {
        if (e.key == 'w') {
            pr1.style.top = Math.max(board_coord.top, pr1_coord.top - window.innerHeight * 0.06) + 'px';
            pr1_coord = pr1.getBoundingClientRect();
        }
        if (e.key == 's') {
            pr1.style.top = Math.min(board_coord.bottom - p_common.height, pr1_coord.top + window.innerHeight * 0.06) + 'px';
            pr1_coord = pr1.getBoundingClientRect();
        }

        if (e.key == 'ArrowUp') {
            pr2.style.top = Math.max(board_coord.top, pr2_coord.top - window.innerHeight * 0.1) + 'px';
            pr2_coord = pr2.getBoundingClientRect();
        }
        if (e.key == 'ArrowDown') {
            pr2.style.top = Math.min(board_coord.bottom - p_common.height, pr2_coord.top + window.innerHeight * 0.1) + 'px';
            pr2_coord = pr2.getBoundingClientRect();
        }
    }
    if(gameState == 'play'){
        if(p1_score.innerHTML == 10 && p2_score.innerHTML < 10){
            text.innerHTML = "Player 1 won";
            window.alert('Player  1 won'); 
            location.reload();          
        }
        if(p2_score.innerHTML == 10 && p1_score.innerHTML < 10){
            text.innerHTML = "Player 2 won";
            window.alert('Player  2 won'); 
            location.reload();          
        }

    }
});

