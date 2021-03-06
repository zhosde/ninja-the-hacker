// load the game
window.onload = () => {
  document.getElementById("start-btn").addEventListener("click", function () {
    let none = (document.getElementById("welcome-page").style.display = "none");
    startGame();
  });
};

// get the canvas and score
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let score = document.getElementById("score");

// variables/instances
let targets = [];
let bullets = [];
let rewards = [];
let scoreNo = 0;
let framesOne = 0;
let framesTwo = 0;
let targetRate = 100;
let interval;
let backGround = new Background();
let player = new Player();
let gameover = new Gameover();
let levelup = new Levelup();

// sounds
let shooting = new Audio("./audio/shuriken.mp3");
let bgm = new Audio("./audio/bgm.mp3");

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
    shooting.play();
  }
  if (e.key === "Enter") {
    document.location.reload();
  }
};

// update the targets
function updateTargets() {
  if (framesOne % targetRate === 0) {
    let target = new Target();
    targets.push(target);
  }

  for (let i = 0; i < targets.length; i++) {
    targets[i].y += 1;
    targets[i].draw();
    for (let j = 0; j < bullets.length; j++) {
      if (
        bullets[j].y + bullets[j].height > targets[i].y &&
        bullets[j].y < targets[i].y + targets[i].height &&
        bullets[j].x + bullets[j].width > targets[i].x &&
        bullets[j].x < targets[i].x + targets[i].width
      ) {
        bullets.splice(j, 1);
        targets.splice(i, 1);
        scoreNo += 20;
        continue;
      }
    }
  }
}

// update the rewards
function updateRewards() {
  if (framesTwo % 500 === 0) {
    let reward = new Reward();
    rewards.push(reward);
  }

  for (let i = 0; i < rewards.length; i++) {
    rewards[i].y += 1;
    rewards[i].draw();
    if (
      player.y + player.height > rewards[i].y &&
      player.y + 15 < rewards[i].y + rewards[i].height &&
      player.x - 50 + player.width > rewards[i].x &&
      player.x + 30 < rewards[i].x + rewards[i].width
    ) {
      rewards.splice(i, 1);
      scoreNo += 50;
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
    if (bullets[j].y < 0) {
      bullets.splice(j, 1);
    }
  }
}

// set the score
function setScore() {
  score.innerHTML = scoreNo;
}

// check boundry for the player
function checkBoundry() {
  if (player.x <= backGround.x) {
    player.x = backGround.x;
  }
  if (player.x >= backGround.width - player.width) {
    player.x = backGround.width - player.width;
  }
}

// collison detection --> target vs player
function crashWith(target) {
  return !(
    player.y + player.height < target.y ||
    player.y + 15 > target.y + target.height ||
    player.x - 50 + player.width < target.x ||
    player.x + 30 > target.x + target.width
  );
}

// check game over
function checkGameOver() {
  const crashed = targets.some(function (target) {
    return crashWith(target);
  });
  if (crashed) {
    gameoverDisplay();
    stopGame();
  }
}

// game over display
function gameoverDisplay() {
  gameover.draw();
}

// level up display
function levelUpDisplay() {
  levelup.draw();
}

// check game level
function setTargetRate() {
  targetRate = targetRate - 30;
}
function checkLevel() {
  if (framesOne === 1000) {
    levelUpDisplay();
    stopGame();
    setTimeout(() => {
      startGame();
    }, 2000);
    targetRate = 60;
  } else if (framesOne === 2000) {
    levelUpDisplay();
    stopGame();
    setTimeout(() => {
      startGame();
    }, 2000);
    targetRate = 40;
  }
}

// clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// stop the game
function stopGame() {
  clearInterval(interval);
}

// set interval
function startGame() {
  interval = setInterval(updateGame, 20);
}

// update the game
function updateGame() {
  clearCanvas();
  backGround.draw();
  player.draw();
  bgm.play();
  checkBoundry();
  checkLevel();
  checkGameOver();
  updateBullets();
  updateTargets();
  setScore();
  updateRewards();
  framesOne++;
  framesTwo++;
}
