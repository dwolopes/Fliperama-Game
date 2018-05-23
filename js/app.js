const enemyInitY = [70, 150, 230] // a bug can appear in any of theses poits related to Y axy
const enemyInitX = [0, 200, 400] // A player can start from any of these poits related to X axy
const allEnemies = [] // array to save all objetcs enemies
let i = 0 // interator responsible for move and fill the Enemy array

let config = {
  'enemy': {
    'initial_X': -70,
    'image': 'images/enemy-bug.png',
    'enemyInitY': [70, 150, 230],
    'radious': 30,
    'xLimit': 505,
    'speedIncremeter': 3

  },
  'player': {
    'initial_Y': 380,
    'image': 'images/char-boy.png',
    'enemyInitX': [0, 200, 400],
    'radious': 30,
    'xLimit': 505,
    'leftLimit': 0,
    'topLimit': 60,
    'rightLimit': 400,
    'bottomLimit': 380,
    'leftRightDecrement': 100,
    'upDownDecrement': 80
  }
}

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor () {
    this.sprite = config.enemy.image
    // Enemies start in the very begging of the screen
    this.x = config.enemy.initial_X
    // Enemies can appear in any position related do Y axy
    this.y = config.enemy.enemyInitY[Math.floor((Math.random() * 3))]
    // Initial speed of the enemy
    this.speed = Math.floor((Math.random() * 70) + 10)
    // Radious which helps to check collisions
    this.radious = config.enemy.radious
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update (dt) {
    // multiply any movement by the dt parameter, making sure the speed will be the same in any computer
    // which will ensure the game runs at the same speed for
    // Inside de canvas element, increment the speed and move x axy
    // If the bug achieve the limits of canvas element, start from the initial position again
    if (this.x < config.enemy.xLimit) {
      this.x += this.speed * dt * config.enemy.speedIncremeter
    } else {
      this.x = config.enemy.initial_X
      // 3, 70 and 10 are randomly chosen to define the speed
      this.y = enemyInitY[Math.floor((Math.random() * 3))]
      this.speed = Math.floor((Math.random() * 70) + 10)
    }
  }

  // Draw the enemy on the screen, required method for game
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  // Check colisions
  // Calculate de distance between the center of the enemy and player
  // if the distance between these two points is less than 2 times the radious of these elements,
  // a colision was detected
  checkCollisions () {
    let xDistace = this.x - player.x
    let yDistace = this.y - player.y
    let xyDistance = Math.sqrt(xDistace * xDistace + yDistace * yDistace)
    if (xyDistance < this.radious + player.radious) {
      // a collision was deteced so the player wil start again from one of the initial points
      player.y = config.player.initial_Y
      player.x = enemyInitX[Math.floor((Math.random() * 3))]
    }
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor () {
    this.sprite = config.player.image
    // Initial point of the player relates do Y axy
    this.y = config.player.initial_Y
    // Sort the position where there player will start
    this.x = enemyInitX[Math.floor((Math.random() * 3))]
    // Radious which helps to check collisions
    this.radious = config.player.radious
  }

  // Update player position
  update () {}

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  // according to the limits of the canvas element, move the player
  handleInput (keyCode) {
    if (keyCode === 'left' && this.x > config.player.leftLimit) {
      this.x = this.x - config.player.leftRightDecrement
    }
    if (keyCode === 'right' && this.x < config.player.rightLimit) {
      this.x = this.x + config.player.leftRightDecrement
    }
    if (keyCode === 'up') {
      this.y = this.y - config.player.upDownDecrement
      if (this.y < config.player.topLimit) {
        this.y = config.player.initial_Y
        this.x = enemyInitX[Math.floor((Math.random() * 3))]
      }
    }
    if (keyCode === 'down' && this.y < config.player.bottomLimit) {
      this.y = this.y + config.player.upDownDecrement
    }
  }
}

// instantiating enemy and player.
// Place all enemy objects in an array called allEnemies
for (i = 0; i <= 2; i++) {
  allEnemies[i] = new Enemy()
}
// Place the player object in a variable called player
const player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  player.handleInput(allowedKeys[e.keyCode])
})
