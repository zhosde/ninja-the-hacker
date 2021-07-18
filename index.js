//load the game
window.onload = () => {
  document.getElementById("start-btn").addEventListener("click", function () {
    let none = (document.getElementById("welcome-page").style.display = "none");
    startGame();
  });
};
//get the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//class the background image
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./images/bg.jpg";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
let backGround = new Background();
// class the player
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 96;
    this.height = 96;
    this.speedX = 0;
    this.img = new Image();
    this.img.src = "./images/ninja.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  moveLeft() {
    this.x -= 15;
  }
  moveRight() {
    this.x += 15;
  }
}
let player = new Player(350, 300);
//arrow control
document.onkeydown = function (e) {
  if (e.key === "ArrowLeft") {
    player.moveLeft();
  } else if (e.key === "ArrowRight") {
    player.moveRight();
  }
};
//class the targets
let targets = [];
class Targets {
  constructor() {
    this.y = Math.floor(Math.random() * 50);
    this.x = Math.floor(Math.random() * 600);
    this.width = 32;
    this.height = 32;
    this.img = new Image();
    this.img.src = "./images/bug.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
//update the targets
let frames = 0;
let updateTargets = function () {
  frames += 1;
  if (frames % 120 == 0) {
    let target = new Targets();
    targets.push(target);
  }
  for (let i = 0; i < targets.length; i++) {
    targets[i].y += 1;
    targets[i].draw();
  }
};
//class the bullets
let bullets = [];
class Bullets {
  constructor() {
    this.x = player.x;
    this.y = player.y;
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = "./images/Shuriken.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
//shooting
let updateBullets = function () {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    bullets[i].y -= 5;
  }
};
document.onkeyup = function (e) {
  if (e.key == "Space") {
    bullets.push(bullet);
  }
};
//score
//targets that missed
//clear the canvas
let clearCanvas = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
//start the game
function startGame() {
  setInterval(() => {
    clearCanvas();
    backGround.draw();
    player.draw();
    updateTargets();
  }, 20);
}
