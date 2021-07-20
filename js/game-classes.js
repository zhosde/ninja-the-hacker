// class the background image
class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "../images/bg.jpg";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}


// class the player
class Player {
  constructor() {
    this.x = 350;
    this.y = 300;
    this.width = 96;
    this.height = 96;
    this.img = new Image();
    this.img.src = "../images/ninja.png";
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


// class the target
class Target {
  constructor() {
    this.y = Math.floor(Math.random() * 50);
    this.x = Math.floor(Math.random() * 600);
    this.width = 32;
    this.height = 32;
    this.img = new Image();
    this.img.src = "../images/bug.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}


// class the bullet
class Bullet {
  constructor() {
    this.x = player.x+15;
    this.y = player.y;
    this.width = 25;
    this.height = 25;
    this.img = new Image();
    this.img.src = "../images/blade.png";
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

// class the game over picture
class Gameover{
  constructor(){
    this.x = 241.5;
    this.y = 30;
    this.width = 317;
    this.height = 340;
    this.img = new Image();
    this.img.src = '../images/game-over.png'
  }
  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}