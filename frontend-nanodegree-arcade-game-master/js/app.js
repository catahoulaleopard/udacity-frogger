var gameBottom = 440;
var gameTop = 0;
var gameRight = 400;
var gameLeft = 0;



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
    if (!this.xOffset) { this.xOffset = 0; }
    if (!this.yOffset) { this.yOffset = 0; }
    if (!this.speed) { this.speed = 71; }
    if (this.dir === 'west') { 
        this.x -= dt * this.speed;
        this.xOffset = 101; 
    } else { 
        this.x += dt * this.speed;
        this.xOffset = 0; 
    }
    if (!this.xOffset) { this.xOffset = 0; }

    for(i=0; i<allEnemies.length; i++) {
            if (allEnemies[i].x < -1600 || allEnemies[i].x > 1600) {
            this.replaceEnemy(i);
            }
        }
};

Enemy.prototype.replaceEnemy = function(i){
    var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
    xOrigMod = (Math.floor(Math.random() * 5)) * 320,
    xOrig = 0,
    yOrig = ((Math.floor(Math.random() * 4) +1) * 83)-25,
    dirOfEnemy = Math.floor(Math.random() * 2) + 1;

    if(dirOfEnemy === 1) {
        enemyDir = 'east';
        xOrig = -90;
        this.xOffset = 0;
    } else {
        enemyDir = 'west';
        xOrig = 505;
        this.xOffset = 101;
    }


    if (kindOfEnemy === 1) { allEnemies.splice(i,1,new Bug(xOrig, yOrig)); }
    else { allEnemies.splice(i,1,new Bear(xOrig, yOrig));
    }
    allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
    allEnemies[i].dir = enemyDir;
}

Enemy.prototype.addNewEnemy = function() {
    var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
    dirOfEnemy = Math.floor(Math.random() * 2) + 1;

    if(dirOfEnemy === 1) {
        enemyDir = 'east';
        xOrig = -50;
        this.xOffset = 0;
    } else {
        enemyDir = 'west';
        xOrig = 505;
        this.xOffset = 101;
    }

    if (kindOfEnemy === 1) { allEnemies.push(new Bug(xOrig, yOrig)); 
    } else { 
        allEnemies.push(new Bear(xOrig, yOrig));
    }
    allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
    allEnemies[i].dir = enemyDir;
   //console.log("NEW ENEMY: " + allEnemies.length );
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xOffset, this.yOffset, 100, 170, this.x, this.y, 100, 170);
};
Enemy.prototype.checkX = function() {
}

var Bug = function(xOrig, yOrig){
    Enemy.call(this, xOrig, yOrig);
    this.sprite = 'images/enemy-bug.png';
    this.xOrig = xOrig;
    this.yOrig = yOrig;
}
Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;
Bug.prototype.checkX = function(){
    this.y = this.yOrig + (Math.floor(Math.random()*3))-12;
}

var Bear = function(xOrig, yOrig){
    Enemy.call(this, xOrig, yOrig);
    this.sprite = 'images/enemy-bear-sprites.png';
    this.xOrig = xOrig;
    this.yOrig = yOrig;
}
Bear.prototype = Object.create(Enemy.prototype);
Bear.prototype.constructor = Bear;
Bear.prototype.checkX = function() {
    if(this.x >180 && this.x < 200 || this.x >280 && this.x < 300){
        this.xOffset = 101;
    } else if(this.x >200 && this.x < 280){
        this.xOffset = 202;
    } else this.xOffset = 0;
    if(this.x >60 && this.x < 120 
        || this.x >180 && this.x < 240
        || this.x >300 && this.x < 360){
        this.yOffset = 171;
    } else this.yOffset = 0;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-rodent2.png';
    this.x = 200;
    this.y = 425;
}

Player.prototype.update =  function() {
    if (!this.xOffset) { this.xOffset = 0; }
    if (!this.yOffset) { this.yOffset = 0; }
};

Player.prototype.collided = false;

Player.prototype.handleInput = function(key) {
    if(this.collided == false) {
        if(key === 'left' && this.x > gameLeft + 40) {
            this.x -= 100;
            this.yOffset = 171;
        }
        if(key === 'right' && this.x < gameRight - 60) {
            this.x += 100;
            this.yOffset = 0;
        }
        if(key === 'up' && this.y > gameTop + 40) {
            this.y -= 85; 
            this.yOffset = 342;
        }
        if(key === 'down' && this.y < gameBottom - 60) {
            this.y += 85;
            this.yOffset = 513;
        }
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xOffset, this.yOffset, 100, 170, this.x, this.y, 100, 170);
            //(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.collision = function() {
    this.collided = true;
    this.xOffset = 101;
    document.getElementById('canvas').setAttribute('class', 'shake');
}

Player.prototype.checkCollisions = function() {
    for(i=0; i<allEnemies.length; i++) {
        if (this.x > (allEnemies[i].x-20) 
            && this.x < (allEnemies[i].x+20)
            && this.y > (allEnemies[i].y-25) 
            && this.y < (allEnemies[i].y+35)
        ) {
        this.collision();
        }
    }
}

Player.prototype.checkGoal = function() {
    if (this.y < 50){
        this.goal();
    }
}
Player.prototype.score = 0;
Player.prototype.goal = function() {
    this.score ++;
   // this.x = 200;
    this.y = 425;
    Enemy.prototype.addNewEnemy();
    //console.log(this.score);
}


var Score = function() {
}

Score.prototype.render = function() {
    ctx.font = "30px Arial";
    ctx.clearRect(10,0,400,50);
    ctx.fillText("Your Score: "+player.score,10,40);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//var enemyBear = new Bear(-130,300);

var numberOfEnemies = 2;
var allEnemies = [];
for(i=0; i<numberOfEnemies; i++) {
    var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
    xOrigMod = (Math.floor(Math.random() * 5)) * 320,
    xOrig = 0,
    yOrig = ((Math.floor(Math.random() * 4) +1) * 83)-25,
    dirOfEnemy = Math.floor(Math.random() * 2) + 1;

    if(dirOfEnemy === 1) {
        enemyDir = 'east';
        xOrig = 0-xOrigMod;
    } else {
        enemyDir = 'west';
        xOrig = 505 + xOrigMod;
    }
    if (kindOfEnemy === 1) { allEnemies.push(new Bug(xOrig, yOrig)); }
    else { allEnemies.push(new Bear(xOrig, yOrig));
    }
    allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
    allEnemies[i].dir = enemyDir;
}

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
   // enemyBear.handleInput(allowedKeys[e.keyCode]);
});

var score= new Score();