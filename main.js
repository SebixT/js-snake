class Snake {
    constructor(head, board) {
        this.head             = head;
        this.board            = board;
        this.headSize         = this.head.offsetWidth;
        this.speed            = 200;
        this.prevDirection    = undefined;
        this.currentDirection = undefined;
        this.newGame();
    }
    newGame() {
        this.head.style.left  = 0;
        this.head.style.top   = 0;
        this.prevDirection    = undefined;
        this.currentDirection = undefined;
        this.headX            = window.getComputedStyle(this.head).left;
        this.headY            = window.getComputedStyle(this.head).top;
    }
    setPrevDirection(dir) {
        /* 
        'ArrowRight' - right; 
        'ArrowLeft' - left; 
        'ArrowUp' - up; 
        'ArrowDown' - down;
        */
        this.prevDirection = dir;
    }
    getPrevDirection() {
        return this.prevDirection;
    }
    setCurrentDirection(dir) {
        /* 
        'ArrowRight' - right; 
        'ArrowLeft' - left; 
        'ArrowUp' - up; 
        'ArrowDown' - down;
        */
        if(this.getPrevDirection() == undefined) {
            this.setPrevDirection(dir);
            this.currentDirection = dir;
            return;
        }
        if(this.getPrevDirection() != undefined) {
            
            switch(dir) {
                case 'ArrowRight':
                    if(   (this.getPrevDirection() == 'ArrowRight')
                        ||(this.getPrevDirection() == 'ArrowLeft')
                        ) {
                            return '';
                        }else {
                            this.currentDirection = dir;
                            this.setPrevDirection(this.getCurrentDirection());
                            return '';
                        }
                    break;
                case 'ArrowLeft':
                    if(   (this.getPrevDirection() == 'ArrowRight')
                        ||(this.getPrevDirection() == 'ArrowLeft')
                        ) {
                            return '';
                        }else {
                            this.currentDirection = dir;
                            this.setPrevDirection(this.getCurrentDirection());
                            return '';
                        }
                    break;
                case 'ArrowUp':
                    if(   (this.getPrevDirection() == 'ArrowUp')
                        ||(this.getPrevDirection() == 'ArrowDown')
                        ) {
                            return '';
                        }else {
                            this.currentDirection = dir;
                            this.setPrevDirection(this.getCurrentDirection());
                            return '';
                        }
                    break;
                case 'ArrowDown':
                    if(   (this.getPrevDirection() == 'ArrowUp')
                        ||(this.getPrevDirection() == 'ArrowDown')
                        ) {
                            return '';
                        }else {
                            this.currentDirection = dir;
                            this.setPrevDirection(this.getCurrentDirection());
                            return '';
                        }
                    break;
                default:
                    break;
            }
        }
    }
    getCurrentDirection() {
        return this.currentDirection;
    }
    setSpeed(value) {
        return this.speed = value;
    }
    getSpeed() {
        return this.speed;
    }
    move() {
        switch(this.getCurrentDirection()) {
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
        
        if(    (parseInt(this.headX) > 390) 
            || (parseInt(this.headX) < 0) 
            || (parseInt(this.headY) > 390) 
            || (parseInt(this.headY) < 0)
            ) {
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
    if(directionArr.includes(key)) snake.setCurrentDirection(key);
});

setInterval(function() { 
    snake.move(); 
}, snake.getSpeed());