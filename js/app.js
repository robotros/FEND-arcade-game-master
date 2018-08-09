/* app.js
 *
 */
const rows = 5;
const columns = 5;
const canvasWidth = 505;
const movement = canvasWidth / columns;
const yMovement = 83;


/**
 * Enemies our player must avoid
 * @constructor
 * @param speed - speed of the ememy
 * @param row - Trow the enemy will spawn on
 */
var Enemy = function(speed, row) {

    // x coordinate for sprite
    this.x = -((Math.floor(Math.random() * 10) / 2) + 1);
    // y coordinate for sprite
    row ? this.y = (yMovement * row) - 15 : this.y = yMovement - 15;
    // enemy speed
    speed ? this.speed = speed : this.speed = 4;
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Update the enemy's position, required method for game
 * @param dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {

    // check canvas boundary
    if (this.x > canvasWidth) {
        r = (Math.floor(Math.random() * 10) / 2) + 1
        r1 = Math.floor(Math.random() * 10) + 1
        this.x = -movement * (r);
        this.speed = r1;
    } else {
        this.x = this.x + (dt * this.speed * (movement / 4));
    }
};

/* Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Player of the game
 * @constructor
 */
var Player = function() {
    // player sprite
    this.sprite = 'images/char-boy.png';
    // x coordinate of sprite
    this.x = 2 * movement;
    // y coordinate of sprite
    this.y = (rows * yMovement) - 10;
};

/* checks player location for win/lose conditions */
Player.prototype.update = function() {
    //check win condition
    if (this.y === -10) {
        this.x = 2 * movement;
        this.y = (rows * yMovement) - 10;
    };
    //check lose condition
    allEnemies.forEach(function(each) {
        if (each.y + 5 === player.y && each.x > player.x - (movement - 30) && each.x < player.x + movement) {
            player.x = 2 * movement;
            player.y = (rows * yMovement) - 10;
        };
    });
};

/* Draw the player on the screen */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * move player according to input
 * @param keycode - input movement direction
 */
Player.prototype.handleInput = function(keycode) {
    switch (keycode) {
        case 'left':
            if (this.x >= movement) {
                this.x = this.x - movement;
            }
            break;
        case 'right':
            if (this.x < canvasWidth - movement) {
                this.x = this.x + movement;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y = this.y - yMovement;
            }
            break;
        case 'down':
            if (this.y < (yMovement * (rows)) - 10) {
                this.y = this.y + yMovement;
            }
            break;
    }
};


// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];

// Place all enemy objects in an array called allEnemies
for (x = 0; x < 2; x++) {
    for (i = 1; i <= rows - 2; i++) {
        let speed = Math.floor(Math.random() * 10) + 1;
        let enemy = new Enemy(speed, i);
        allEnemies.push(enemy);
    };
};


/* 
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 *
 * @param keyup - input from keyboard
 */

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});