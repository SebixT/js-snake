class Snake {
    constructor(head, board) {
        this.head      = head;
        this.board     = board;
        this.headSize  = this.head.offsetWidth;
        this.speed     = 200;
        /* 
        'ArrowRight' - right; 
        'ArrowLeft' - left; 
        'ArrowUp' - up; 
        'ArrowDown' - down;
        */
        this.newGame();
    }
    newGame() {
        this.head.style.left = 0;
        this.head.style.top  = 0;
        this.headX           = window.getComputedStyle(this.head).left;
        this.headY           = window.getComputedStyle(this.head).top;
        this.direction       = 'ArrowRight'; 
    }
    setDirection(dir) {
        this.direction = dir;
    }
    setSpeed() {

    }
    move() {
        switch(this.direction) {
            case 'ArrowRight':
                this.headX = parseInt(this.headX) + this.headSize + 'px';
                break;
            case 'ArrowLeft':
                this.headX = parseInt(this.headX) - this.headSize + 'px';
                break;
            case 'ArrowUp':
                this.headY = parseInt(this.headY) - this.headSize + 'px';
                break;
            case 'ArrowDown':
                this.headY = parseInt(this.headY) + this.headSize + 'px';
                break;
            default:
                break;
        }
        this.head.style.left = this.headX;
        this.head.style.top  = this.headY;
        if((parseInt(this.headX) > 390) || (parseInt(this.headX) < 0) || (parseInt(this.headY) > 390) || (parseInt(this.headY) < 0)){
            this.newGame();
        }
    }
    addBody() {

    }
    createFood() {

    }
    startGame() {

    }
}
const head  = document.querySelector('#head');
const board = document.querySelector('#board');

const directionArr  = [
    'ArrowRight', 
    'ArrowLeft', 
    'ArrowUp', 
    'ArrowDown'
];

const snake = new Snake(head, board);

document.body.addEventListener('keydown', 
function(event) { 
    const key = event.key; 
    if(directionArr.includes(key)) snake.setDirection(key);
});

setInterval(function() { 
    snake.move(); 
}, snake.speed);