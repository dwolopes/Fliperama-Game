const enemyInitY = [70, 150, 230]
const enemyInitX = [0, 200, 400]
const allEnemies = []

// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor () {
    this.sprite = 'images/enemy-bug.png'
    this.x = -70
    this.y = enemyInitY[Math.floor((Math.random() * 3))]
    this.speed = Math.floor((Math.random() * 70) + 10)
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x += this.speed * dt * 3
    } else {
      this.x = -70
      this.y = enemyInitY[Math.floor((Math.random() * 3))]
      this.speed = Math.floor((Math.random() * 70) + 10)
    }
  }

  // Draw the enemy on the screen, required method for game
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor () {
    this.sprite = 'images/char-boy.png'
    this.y = 400
    this.x = enemyInitX[Math.floor((Math.random() * 3))]
  }

  update (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  handleInput (keyCode) {

  }
}

// instantiating enemy and player.
// Place all enemy objects in an array called allEnemies
for (i = 0; i <= 2; i++) {
  allEnemies[i] = new Enemy()
}
const player = new Player()

// Place the player object in a variable called player

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
