const rows = 5;
const columns = 5;
//const canvasHeight = 605;
const canvasWidth = 505;

const movement=canvasWidth/columns;
const yMovement = 83;

// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -movement;
    row ? this.y = (yMovement*row)-15 : this.y = yMovement-15;
    speed ? this.speed = speed : this.speed = 4;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > canvasWidth) {
        this.x= -movement;
        this.speed = Math.floor(Math.random() * 10)+1;
    } else {
        this.x = this.x+(dt*this.speed*(movement/4));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 0;//canvasWidth-movement;
    this.y=(rows*yMovement)-10;
};

Player.prototype.update = function(){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode){
    switch (keycode){
        case 'left':
            if (this.x >= movement) {
            	this.x = this.x-movement;
            }
            break;
        case 'right':
            if (this.x < canvasWidth-movement) {
            	this.x = this.x+movement;
        	}
            break;
        case 'up':
            if (this.y > 0) {
            	this.y=this.y-yMovement;
        	}
            break;
        case 'down':
            if (this.y < (yMovement*(rows+1))-10) {
                this.y=this.y+yMovement;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let allEnemies = [];

for(i = 1; i <= rows; i++) {
    let speed = Math.floor(Math.random() * 10)+1;
    let enemy = new Enemy(speed,i);
    allEnemies.push(enemy);
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
