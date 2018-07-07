/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
function testWorking() {
  console.log('working')
}

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    } 
    else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {return true
    } 
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    }
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = `${top}px`
  
  document.getElementById('game').appendChild(rock)
  
  function moveRock() {
    var topValue = rock.style.top.replace('px','')
    var topValueInteger = parseInt(topValue, 10)
    rock.style.top = `${topValueInteger + 2}px`
    
    if (checkCollision(rock)) {
      endGame()
    }

    if (topValueInteger < 380) {
      window.requestAnimationFrame(moveRock)
    } else {
        rock.remove()
    }
  }
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
   
  ROCKS.forEach(function(rock) {
    rock.remove()
  })
  
  window.removeEventListener('keydown', moveDodger)
    
  alert('You Lose!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  var leftValue = DODGER.style.left.replace('px', '')
  var leftValueInteger = parseInt(leftValue, 10)
  
  function moveLeft() {
    if (leftValueInteger >= 0) {
      DODGER.style.left = `${leftValueInteger - 4}px`
      window.requestAnimationFrame(moveLeft)
    }
  }
  window.requestAnimationFrame(moveLeft)
}

function moveDodgerRight() {
  var leftValue = DODGER.style.left.replace('px', '')
  var leftValueInteger = parseInt(leftValue, 10)
  
  function moveRight() {
    if (leftValueInteger <= 360) {
      DODGER.style.left = `${leftValueInteger + 4}px`
      window.requestAnimationFrame(moveRight)
    }
  }
  window.requestAnimationFrame(moveRight)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 5000)
}
