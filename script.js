//canvas vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// spaceship vars
var shipWidth = 55;
var shipHeight = 10;
var shipX = (canvas.width - shipWidth) / 2;
var shipY = canvas.height - shipHeight;

//spaceship gun vars
var gunWidth = 10;
var gunHeight = 15;
var gunX = shipX + shipWidth / 2 - gunWidth / 2;
var gunY = shipY - gunHeight;

//ship movement vars
var rightPressed = false;
var leftPressed = false;

//laser shoot vars
var spacePressed = false;

//laser vars
var laserHeight = 10;
var laserWidth = 4;
var laserX = gunX + gunWidth - laserWidth;
var laserY = gunY - 10;

function drawShip() {
  ctx.beginPath();
  ctx.rect(shipX, shipY, shipWidth, shipHeight);
  ctx.fillStyle = 'chartreuse';
  ctx.fill();
  ctx.closePath();

  //gun section
  ctx.beginPath();
  ctx.rect(gunX, gunY, gunWidth, gunHeight);
  ctx.fillStyle = 'chartreuse';
  ctx.fill();
  ctx.closePath();
}

function drawLaser() { 
      if (spacePressed) {
        ctx.beginPath();
        ctx.rect(laserX, laserY, laserWidth, laserHeight);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath(); 
      }
    }

    //invader vars
    var invaderWidth = 50;
    var invaderX = 50;
    var invaderY = 50;
    var ix = 2;
    var changeCount = 0;
    //invaders
    function drawInvader() {
      ctx.beginPath();
    ctx.moveTo(invaderX, invaderY);
    ctx.lineTo(invaderX + invaderWidth, invaderY);
    ctx.lineTo(invaderX + (invaderWidth / 2), invaderY + 20);
    ctx.fillStyle = 'white';
    ctx.stroke();
    ctx.fill();
    }


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawLaser();
  drawInvader();
  //invader movement logic
  if ((invaderX + ix) + invaderWidth > canvas.width || (invaderX + ix) < 0 ) {
    ix = -ix;
    changeCount ++;
  }

  switch (changeCount) {
    case 1:
      invaderY = 100;
      break;
    case 2:
      invaderY = 150;
      break;
      case 4:
        invaderY = 250;
    default:
      break;
  }

  invaderX += ix;
  //ship movement logic
  if (rightPressed && shipX < canvas.width - shipWidth) {
    shipX += 5;
    gunX += 5;
    if (!spacePressed) {
      laserX += 5;
    }
  } else if (leftPressed && shipX > 0) {
    shipX += -5;
    gunX += -5;
    if (!spacePressed) {
      laserX += -5;
    }
  }

  if (spacePressed && laserY > -1) {
      laserY += -2;
  } else if (laserY < 0) {
    spacePressed = false;
    laserX = shipX + 28;
    laserY = shipY;
  }


}

//key handler functions
function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key == " ") {
      spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  } 
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

setInterval(draw, 10);
