// Boundaries of the playable area
var gameBottom = 440;
var gameTop = 0;
var gameRight = 400;
var gameLeft = 0,
xOrig,
yOrig = ((Math.floor(Math.random() * 4) + 1) * 83) - 25;

// Enemies player must avoid
var Enemy = function (xOrig, yOrig) {
   // The image/sprite for enemies
   this.sprite = 'images/enemy-bug.png';

   // Set default enemy position
   if (!xOrig) {
      xOrig = 0;
   }
   if (!yOrig) {
      yOrig = 120;
   }
   this.x = xOrig;
   this.y = yOrig;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
   // Set the enemy sprite's default spritesheet offset to 0
   if (!this.xOffset) {
      this.xOffset = 0;
   }
   if (!this.yOffset) {
      this.yOffset = 0;
   }
   // Multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   if (!this.speed) {
      this.speed = 71;
   }
   if (this.dir === 'west') {
      this.x -= dt * this.speed;
      this.xOffset = 101;
   } else {
      this.x += dt * this.speed;
      this.xOffset = 0;
   }

   for (i = 0; i < allEnemies.length; i++) {
      if (allEnemies[i].x < -1600 || allEnemies[i].x > 1600) {
         this.replaceEnemy(i);
      }
   }
};

// When an enemy leaves the screen, it is replaced with a new one
// (Could possibly come up with a way to reuse some code from
// initial creation of allEnemies array and addNewEnemy method)
Enemy.prototype.replaceEnemy = function (i) {
   var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
      xOrigMod = (Math.floor(Math.random() * 5)) * 320,
      xOrig = 0,
      yOrig = ((Math.floor(Math.random() * 4) + 1) * 83) - 25,
      dirOfEnemy = Math.floor(Math.random() * 2) + 1;

   if (dirOfEnemy === 1) {
      enemyDir = 'east';
      xOrig = -90;
      this.xOffset = 0;
   } else {
      enemyDir = 'west';
      xOrig = 505;
      this.xOffset = 101;
   }

   if (kindOfEnemy === 1) {
      allEnemies.splice(i, 1, new Bug(xOrig, yOrig));
   } else {
      allEnemies.splice(i, 1, new Bear(xOrig, yOrig));
   }
   allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
   allEnemies[i].dir = enemyDir;
}

// Called when player reaches goal. Adds another enemy to
// the game so the game gets steadily more difficult
Enemy.prototype.addNewEnemy = function () {
   var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
      dirOfEnemy = Math.floor(Math.random() * 2) + 1;

   if (dirOfEnemy === 1) {
      enemyDir = 'east';
      xOrig = -50;
      this.xOffset = 0;
   } else {
      enemyDir = 'west';
      xOrig = 505;
      this.xOffset = 101;
   }

   if (kindOfEnemy === 1) {
      allEnemies.push(new Bug(xOrig, yOrig));
   } else {
      allEnemies.push(new Bear(xOrig, yOrig));
   }
   allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
   allEnemies[i].dir = enemyDir;
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.xOffset, this.yOffset, 100, 170, this.x, this.y, 100, 170);
};
Enemy.prototype.checkX = function () {
   // This method is called in the updateEntities method
   // for each enemy in the allEnemies array
   // Actions depending on the x position of Enemy could go here
}

// Add a bug type of enemy
var Bug = function (xOrig, yOrig) {
   Enemy.call(this, xOrig, yOrig);
   this.sprite = 'images/enemy-bug.png';
   this.xOrig = xOrig;
   this.yOrig = yOrig;
}
Bug.prototype = Object.create(Enemy.prototype);
Bug.prototype.constructor = Bug;

// Make the bug shudder across the screen
Bug.prototype.checkX = function () {
   this.shakeBug();
}
Bug.prototype.shakeBug = function () {
   this.y = this.yOrig + (Math.floor(Math.random() * 3)) - 12;
}

// Add a bear type of enemy
var Bear = function (xOrig, yOrig) {
   Enemy.call(this, xOrig, yOrig);
   this.sprite = 'images/enemy-bear-sprites.png';
   this.xOrig = xOrig;
   this.yOrig = yOrig;
}
Bear.prototype = Object.create(Enemy.prototype);
Bear.prototype.constructor = Bear;

// At certain x positions, the bear makes special movements
Bear.prototype.checkX = function () {
   this.swipePaw();
   this.pedalUnicyle();
}
Bear.prototype.swipePaw = function () {
   if (this.x > 180 && this.x < 200 || this.x > 280 && this.x < 300) {
      this.xOffset = 101;
   } else if (this.x > 200 && this.x < 280) {
      this.xOffset = 202;
   } else this.xOffset = 0;
}
Bear.prototype.pedalUnicyle = function () {
   if (this.x > 60 && this.x < 120 || this.x > 180 && this.x < 240 || this.x > 300 && this.x < 360) {
      this.yOffset = 171;
   } else this.yOffset = 0;
}

// Create the player
var Player = function () {
   this.sprite = 'images/char-rodent2.png';
   this.x = 200;
   this.y = 425;
}

// Set the player sprite's default spritesheet offset to 0
Player.prototype.update = function () {
   if (!this.xOffset) {
      this.xOffset = 0;
   }
   if (!this.yOffset) {
      this.yOffset = 0;
   }
};

Player.prototype.collided = false;

Player.prototype.handleInput = function (key) {
   if (this.collided == false) { // As soon as the player is hit, its motion stops
      if (key === 'left' && this.x > gameLeft + 40) {
         this.x -= 100;
         // The yOffset sets the spritesheet offset to show 
         // the correctly oriented sprite (left, right, up, down)
         this.yOffset = 171;
      }
      if (key === 'right' && this.x < gameRight - 60) {
         this.x += 100;
         this.yOffset = 0;
      }
      if (key === 'up' && this.y > gameTop + 40) {
         this.y -= 85;
         this.yOffset = 342;
      }
      if (key === 'down' && this.y < gameBottom - 60) {
         this.y += 85;
         this.yOffset = 513;
      }
   }
}

Player.prototype.render = function () {
   ctx.drawImage(Resources.get(this.sprite), this.xOffset, this.yOffset, 100, 170, this.x, this.y, 100, 170);
};

// Collision changes player sprite and adds a css class to the canvas
Player.prototype.collision = function () {
   this.collided = true;
   this.xOffset = 101;
   document.getElementById('canvas').setAttribute('class', 'shake');
   //reset();
}

// called from update function, checkCollisions checks player/enemy proximity
// and calls collision method if player is within the x/y boundaries of enemy
Player.prototype.checkCollisions = function () {
   for (i = 0; i < allEnemies.length; i++) {
      if (this.x > (allEnemies[i].x - 25) && this.x < (allEnemies[i].x + 25) && this.y > (allEnemies[i].y - 25) && this.y < (allEnemies[i].y + 45)) {
         this.collision();
      }
   }
}

// Called when player reaches goal. Increments score, returns
// player to bottom of canvas and calls a method to add another enemy
Player.prototype.goal = function () {
   this.score++;
   this.y = 425;
   Enemy.prototype.addNewEnemy();
}

// called from update function, checkGoal checks if player's y position
// is low (high on canvas) enough to score a point
Player.prototype.checkGoal = function () {
   if (this.y < 50) {
      this.goal();
   }
}
Player.prototype.score = 0;

var Score = function () {}

Score.prototype.render = function () {
   ctx.font = 'bold 27px Dosis';
   ctx.fillStyle = '#CD2E70';
   ctx.clearRect(10, 0, 400, 50);
   ctx.fillText('Score: ' + player.score, 10, 40);
}

// Instantiate objects.

var numberOfEnemies = 2;
// Place all enemy objects into allEnemies array
var allEnemies = [];
createEnemies();

function createEnemies() {
   for (i = 0; i < numberOfEnemies; i++) {
      var kindOfEnemy = Math.floor(Math.random() * 2) + 1,
         xOrigMod = (Math.floor(Math.random() * 5)) * 320,
         xOrig = 0,
         yOrig = ((Math.floor(Math.random() * 4) + 1) * 83) - 25,
         dirOfEnemy = Math.floor(Math.random() * 2) + 1;

      if (dirOfEnemy === 1) {
         enemyDir = 'east';
         xOrig = 0 - xOrigMod;
      } else {
         enemyDir = 'west';
         xOrig = 505 + xOrigMod;
      }
      if (kindOfEnemy === 1) {
         allEnemies.push(new Bug(xOrig, yOrig));
      } else {
         allEnemies.push(new Bear(xOrig, yOrig));
      }
      allEnemies[i].speed = Math.floor(Math.random() * 101) + 41;
      allEnemies[i].dir = enemyDir;
   }
};


var player = new Player();

// Listen for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
   var allowedKeys = {
      32: 'space',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
   };
   player.handleInput(allowedKeys[e.keyCode]);
});

var score = new Score();