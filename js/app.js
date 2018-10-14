// Enemies our player must avoid
//initial setup of the Enemy constructor function and its object properties
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 97;
    this.height = 64;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //If the enemy runs off the screen, it resets it
    if (this.x > 600) {
      this.reset();
    }

    //Collision detection with the player.
    if ((Math.abs(this.x - player.x) < (this.width + player.width)/2) &&
    (Math.abs(this.y - player.y) < (this.height + player.height)/2)) {
      player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {

  //ensures that the enemy starts off the screen
  this.x = -98;
  //randomizes the position and speed of the enemy
  this.yArrayIndex = Math.floor(Math.random() * 3);
  //sets the array of possible vertical positions of the enemy
  this.enemyVerticalPositions = [62, 145, 228];
  //randomizes the vertical position of the enemy
  this.y = this.enemyVerticalPositions[this.yArrayIndex];
  //sets a random speed between 30 and 130 to ensure the enemy isn't too slow
  this.speed = Math.floor(Math.random() * 100 + 30)
}


var Player = function() {
    //sets the image of the player
    this.sprite = 'images/char-princess-girl.png';
    //sets the starting position of the player
    this.x = 201;
    this.y = 400;
    //defines the dimensions of the player
    this.width = 72;
    this.height = 75;
};

//necessary function for the game engine
Player.prototype.update = function(dt) {
};

//draw the player on the screen, required method for the game engine
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  //defines the distances of each step
  this.verticalStep = 83;
  this.horizontalStep = 101;
  //utilizing a switch to define the function of each arrow key
  switch(key) {
    case 'left':
      if (this.x >= 0) {
        this.x -= this.horizontalStep;
      }
      break;
    case 'right':
      if (this.x <= 402) {
        this.x += this.horizontalStep;
      }
      break;
    case 'up':
      if (this.y == 68) {
        this.reset();
      } else {
        this.y -= this.verticalStep;
      }
      break;
    case 'down':
      if (this.y <= 399) {
        this.y += this.verticalStep;
      }
      break;
  }
};

//defines the reset position of the player
Player.prototype.reset = function() {
  this.x = 201;
  this.y = 400;
};


//defines the number of enemies present on the screen at any given time
var numberOfEnemies = 5;

//creates the enemy array
var allEnemies = [];

//initiating a new instance of an enemy and initializing the randomization of
//the speed and position of that enemy
for (var i = 0; i < numberOfEnemies; i++) {
  allEnemies[i] = new Enemy(0,0,0);
  allEnemies[i].reset();
}

//initializes the player
var player = new Player();

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
