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

// event control
document.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    player.moveLeft();
  }
  if (e.key === "ArrowRight") {
    player.moveRight();
  }
  if (e.key === " ") {
    shoot();
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
    if (
      !(
        bullets[i].y + bullets[i].height < targets[i].y ||
        bullets[i].y > targets[i].y + targets[i].height ||
        bullets[i].x + bullets[i].width < targets[i].x ||
        bullets[i].x > targets[i].x + targets[i].width
      )
    ) {
      bullets.splice(i, 1);
      targets.splice(i, 1);
      continue;
    }
  }
}

// shoot the bullet
function shoot() {
  let bullet = new Bullet();
  bullets.push(bullet);
}

// update the bullets
function updateBullets() {
  for (let j = 0; j < bullets.length; j++) {
    bullets[j].y -= 10;
    bullets[j].draw();
  }
}

// stop the game
// function stopGame(){
//   ctx.clearInterval(interval)
// }

// collison detection --> target vs player
function crashWith(target) {
  return !(
    player.y + player.height < target.y ||
    player.y + 15 > target.y + target.height ||
    player.x - 50 + player.width < target.x ||
    player.x + 30 > target.x + target.width
  );
}

function checkGameOver() {
  const crashed = targets.some(function (target) {
    return crashWith(target);
  });
  if (crashed) {
    document.location.reload();
    alert("GAME OVER");
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
  setInterval(() => {
    clearCanvas();
    backGround.draw();
    player.draw();
    checkGameOver();
    updateBullets();
    updateTargets();
  }, 15);
}
