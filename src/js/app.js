var score = 0;
var deaths = 0;

var ScoreBoard = function() {
    this.score = 0;
    this.deaths = 0;

    this.lifeSprite = 'images/char-boy.png';
};

//Draw the scoreboard
ScoreBoard.prototype.render = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,505,50);
    
    this.renderScore();
    this.renderDeaths();
};

ScoreBoard.prototype.renderScore = function() {
    ctx.font = "48px serif";
    ctx.strokeText('SCORE: '+score, 10, 40);
};

ScoreBoard.prototype.renderDeaths = function() {
    var resource = Resources.get(this.lifeSprite);
    if(deaths < 3) ctx.drawImage(resource, 300, -30, resource.width/2, resource.height/2);
    if(deaths < 2) ctx.drawImage(resource, 340, -30, resource.width/2, resource.height/2);
    if(deaths < 1) ctx.drawImage(resource, 380, -30, resource.width/2, resource.height/2);
    if(deaths > 3) { score = 0; deaths = 0; }
};

//
ScoreBoard.prototype.update = function() {

};

// Enemies our player must avoid
var Enemy = function(row, speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var row_y = [135,215,300];
    this.x = -100;
    this.direction = direction;
    if(this.direction == 'left') {
        this.x = 600;
    }
    this.y = row_y[row];
    console.log(this.y);
    this.speed = speed;
    

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

    var move = this.speed * dt;
    if(this.direction == 'right') this.x += move;
    else this.x -= move;
    
    //off screen reset
    if(this.x > 600) {
        this.x = -100;
    } else if(this.x < -100) {
        this.x = 600;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var resource = Resources.get(this.sprite);
    
    //grab sprite image height and width
    this.width = resource.width;
    this.height = resource.height;
    
    ctx.drawImage(resource, this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.start_x = 200;
    this.start_y = 405;
    this.x = this.start_x;
    this.y = this.start_y;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(x, y) {
    

};

Player.prototype.score = function() {

    score++;
    console.log('Score: '+score);
    this.x = this.start_x;
    this.y = this.start_y;

};

Player.prototype.die = function() {
    deaths++;
    console.log('Deaths: '+deaths);
    this.x = this.start_x;
    this.y = this.start_y;
}

Player.prototype.render = function() {
    var resource = Resources.get(this.sprite);
    this.width = resource.width;
    this.height = resource.height;
    ctx.drawImage(resource, this.x, this.y);

};

Player.prototype.handleInput = function(input) {

    var moveVertical = 83;
    var moveHorizontal = 101;
    
    var y = this.y;
    var x = this.x;

    switch(input) {
        case 'up':
            y -= moveVertical;
            break;
        case 'down':
            y += moveVertical;
            break;
        case 'left':
            x -= moveHorizontal;
            break;
        case 'right':
            x += moveHorizontal;
            break;
    }

    // Do not move if offscreen
    if(x > 402 || x < -2 || y > 415 || y < -10) {
        console.log('STOP:x:'+x+'y:'+y);
        return;
    } 

    
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    //Update player location
    this.x = x;
    this.y = y;
    this.render();

    if(this.y < 73) {

        //pause to show that you actually moved instead of immediately moving back to the starting position
        sleep(250).then(() => {
            this.score();
        });

    }

    console.log('x:'+this.x+'y:'+this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var scoreBoard = new ScoreBoard();

var allEnemies = [new Enemy(0,300,'right'),new Enemy(1,200,'left'),new Enemy(2,100,'left')];

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
