// Enemies our player must avoid
var Enemy = function(xOrig, yOrig) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    if(!xOrig) {
        xOrig = 0;
    }
    if(!yOrig) {
        yOrig = 120;
    }
    this.x = xOrig;
    this.y = yOrig;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.dir === 'west') { this.x -= dt * this.speed; }
    else { this.x += dt * this.speed; }
    if (!this.xOffset) { this.xOffset = 0; }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xOffset, 0, 100, 170, this.x, this.y, 100, 170);
};

var Bear = function(xOrig, yOrig){
    Enemy.call(this, xOrig, yOrig);
    this.sprite = 'images/enemy-bear-sprites.png';
    this.xOrig = xOrig;
    this.yOrig = yOrig;
}
Bear.prototype = Object.create(Enemy.prototype);
Bear.prototype.constructor = Bear;
Bear.prototype.swipe = function(){
    //var swipeStart = dt;
    this.xOffset = 200;
    //console.log(" ::: "+dt);
};
Bear.prototype.handleInput = function(key) {
    
    if(key === 'space') {
        this.swipe();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-rodent.png';
    this.x = 200;
    this.y = 440;
}

Player.prototype.update =  function(dt) {
};

Player.prototype.handleInput = function(key) {
    
    if(key === 'left') {
        this.x -= 100;
    }
    if(key === 'right') {
        this.x += 100;
    }
    if(key === 'up') {
        this.y -= 85;
    }
    if(key === 'down') {
        this.y += 85;
    }

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemyBear = new Bear(-130,300);
enemyBear.speed = 32;
enemyBear.dir = 'east';
var allEnemies = [enemyBear];
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    enemyBear.handleInput(allowedKeys[e.keyCode]);
});
