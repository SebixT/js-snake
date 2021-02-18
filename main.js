class Snake {
    constructor(head, board) {
        this.head             = head;
        this.board            = board;
        this.headSize         = this.head.offsetWidth;
        this.scoreField       = document.querySelector('#score');
        this.prevDirection    = undefined;
        this.currentDirection = undefined;
        this.newGame();
    }
    newGame() {
        this.head.style.left  = 0;
        this.head.style.top   = 0;
        this.point            = 0;
        this.speed            = 300;
        this.prevDirection    = undefined;
        this.currentDirection = undefined;
        this.snakePosArr      = [];
        this.headX            = window.getComputedStyle(this.head).left;
        this.headY            = window.getComputedStyle(this.head).top;
        this.getSnakeBody();
        this.updatePoint(this.point);
        if(this.food) this.board.removeChild(this.food);

        if(this.getSnakeBody().length > 0) {
            this.getSnakeBody().forEach((bodyPart, i) => {
                this.board.removeChild(bodyPart);
            });
        }
        this.createFood(this.headSize);

        clearInterval(this.intervalVal);
        this.changeInterval();
    }

    /* 
    'ArrowRight' - right; 
    'ArrowLeft' - left; 
    'ArrowUp' - up; 
    'ArrowDown' - down;
    */
    setPrevDirection(dir) {
        this.prevDirection = dir;
    }
    getPrevDirection() {
        return this.prevDirection;
    }
    setCurrentDirection(dir) {
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
    updateSnakeBodyArr() {
        this.snakePosArr = this.snakePosArr.slice().reverse(); //odwrócenie tablicy
    }
    isArrayInArray(arr, item){
        var item_as_string = JSON.stringify(item);
      
        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }
    move() {
        let currHeadX = this.headX;
        let currHeadY = this.headY;
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
        /* Check if head position == body part position */
        if(this.isArrayInArray(this.snakePosArr, [parseInt(this.headX), parseInt(this.headY)])) this.newGame();
        /* */
        this.head.style.left = this.headX;
        this.head.style.top  = this.headY;
        
        if(!((currHeadX == this.headX)&&(currHeadY == this.headY))){

            if(   (this.foodX == parseInt(this.headX))
                &&(this.foodY == parseInt(this.headY))
                ) {
                    this.board.removeChild(this.food);
                    this.addBody(this.headSize, currHeadX, currHeadY);
                    /* Add head position to array */
                    this.snakePosArr.push([parseInt(this.headX), parseInt(this.headY)]);
                    /* */

                    this.point++;
                    this.updatePoint(this.point);
                    
                    if(this.getSpeed() > 110) {
                        clearInterval(this.intervalVal);
                        this.increaseSpeed();
                    }

                    this.createFood(this.headSize);
            }else {
                if((this.getSnakeBody().length > 0)) {
                    let lastBodyPart = this.board.removeChild(this.snakeBody[this.snakeBody.length-1]);
                
                    lastBodyPart.style.left = parseInt(currHeadX) + "px";
                    lastBodyPart.style.top  = parseInt(currHeadY) + "px";

                    this.head.after(lastBodyPart);
                    /* Add head postion to array, remove last body element from array*/
                    this.snakePosArr.pop();
                    this.snakePosArr = this.snakePosArr.reverse();
                    this.snakePosArr.push([parseInt(this.headX), parseInt(this.headY)]);
                    this.snakePosArr = this.snakePosArr.reverse();
                    /* */
                }else {
                    /* */
                    let snakePosArrLen = this.snakePosArr.length;
                    if(snakePosArrLen < 1) {
                        this.snakePosArr.push([parseInt(this.headX), parseInt(this.headY)]);
                    }else {
                        this.snakePosArr.pop();
                        this.snakePosArr = this.snakePosArr.reverse();
                        this.snakePosArr.push([parseInt(this.headX), parseInt(this.headY)]);
                        this.snakePosArr = this.snakePosArr.reverse();
                    } 
                    /* */
                }
            }
            this.getSnakeBody();
            if(    (parseInt(this.headX) > 390) 
                || (parseInt(this.headX) < 0) 
                || (parseInt(this.headY) > 390) 
                || (parseInt(this.headY) < 0)
                ) {
                this.newGame();
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
    getSnakeBody() {
        return this.snakeBody = document.querySelectorAll('[data-snakebody]');
    }
    addBody(size, xPos, yPos) {
        this.body = document.createElement('div');

        this.body.setAttribute('data-snakebody', '');
        this.body.setAttribute('class', 'snake-body');

        this.body.style.left = parseInt(xPos) + "px";
        this.body.style.top  = parseInt(yPos) + "px";
        this.head.after(this.body);
    }
    updatePoint(point) {
        this.scoreField.textContent = "" + point;
    }
    increaseSpeed() {
        this.setSpeed(this.speed - 10);
        this.changeInterval();
    }
    changeInterval() {
        this.intervalVal = setInterval(() => { 
            this.move();
        }, this.getSpeed());
    }
    createFood(size) {
        this.food = document.createElement('div');
                
        let x = parseInt(Math.random()*400);
        let y = parseInt(Math.random()*400);
        x = x - x % this.headSize;
        y = y - y % this.headSize;
        this.food.style.position   = "absolute";
        this.food.style.top        = y + "px";
        this.food.style.left       = x + "px";
        this.food.style.width      = size + "px";
        this.food.style.height     = size + "px";
        this.food.style.background = "pink";
        this.foodX = x;
        this.foodY = y;
        this.board.appendChild(this.food);
    }
    startGame() {

    }
}

const head  = document.querySelector('#head');
const board = document.querySelector('#board');
const body  = document.querySelectorAll('[data-snakebody]');

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