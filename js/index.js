// load the game
window.onload = () => {
  document.getElementById("start-btn").addEventListener("click", function () {
    let none = (document.getElementById("welcome-page").style.display = "none");
    startGame();
  });
};

// get the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// variables/instances
let targets = [];
let bullets = [];
let frames = 0;
let backGround = new Background();
let player = new Player();
let bullet = new Bullet();

// event control
document.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    player.moveLeft();
  }
  if (e.key === "ArrowRight") {
    player.moveRight();
  }
  if (e.key === "Space") {
    bullets.push(bullet);
    updateBullets();
  }
};

// update the targets
function updateTargets() {
  frames += 1;
  if (frames % 120 == 0) {
    let target = new Target();
    targets.push(target);
  }
  for (let i = 0; i < targets.length; i++) {
    targets[i].y += 1;
    targets[i].draw();
  }
}

// update the bullets
function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].y -= 5;
  }
}

// stop the game
// function stopGame(){
//   ctx.clearInterval(interval)
// }

// collison detection
function crashWith(target) {
  return !(
    player.y + player.height < target.y ||
    player.y+15 > target.y + target.height ||
    player.x-50 + player.width < target.x ||
    player.x+30 > target.x + target.width
  );
}

function checkGameOver() {
  const crashed = targets.some(function (target) {
    return crashWith(target);
  });
  if (crashed) {
    document.location.reload();
    alert('GAME OVER')
  }
}

// score
// targets that missed

// clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// start the game
function startGame() {
  let interval = setInterval(() => {
    clearCanvas();
    backGround.draw();
    player.draw();
    updateTargets();
    checkGameOver();
  }, 20);
}
