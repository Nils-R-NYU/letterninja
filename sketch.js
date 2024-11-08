const FRAME_RATE = 60;

let backgroundImage;
let font;

let lifes;
let counter;
let amountOfSpawningLetters;
let gameRunning;

let activeTypewriters = [];
let letters = [];

function preload() {
  backgroundImage = loadImage("./Background.webp");
  font = loadFont("./XTypewriter-Bold.ttf");
}

function setup() {
  createCanvas(800, 800);
  frameRate(FRAME_RATE);

  textFont(font);
  textAlign(CENTER, CENTER);
  newGame();
}

function draw() {
  amountOfSpawningLetters *= 1.00025;

  image(backgroundImage, 0, 0);

  letters.forEach((letter) => {
    letter.update();
    letter.draw();
  });

  activeTypewriters.forEach((typewriter) => {
    typewriter.update();
    typewriter.draw();
  });

  if (gameRunning && (frameCount / FRAME_RATE) % 3 === 0) {
    spawnWave();
  }

  drawLifes();
  drawCounter();

  if (!gameRunning) {
    drawEndScreen();
  }
}

function newGame() {
  lifes = 3;
  counter = 0;
  amountOfSpawningLetters = 3;
  gameRunning = true;

  letters = [];
  activeTypewriters = [];
}

function spawnWave() {
  for (let i = 0; i < Math.floor(amountOfSpawningLetters); i++) {
    letters.push(new Letter(letters, removeLife));
  }
}

const removeLife = () => {
  lifes--;

  if (lifes === 0) {
    loseGame();
  }
};

function loseGame() {
  gameRunning = false;
}

function mousePressed() {
  if (
    !gameRunning &&
    mouseX > width / 2 - 200 &&
    mouseX < width / 2 + 200 &&
    mouseY > height / 2 + 100 &&
    mouseY < height / 2 + 200
  ) {
    newGame();
  }
}

function keyPressed() {
  if (!ALPHABET.includes(key) || !gameRunning) {
    return;
  }

  const hitLetter = letters.find(
    (letter) => letter.letter === key && !letter.isHit
  );
  if (hitLetter) {
    hitLetter.remove(activeTypewriters);
    counter += 1;
  }
}

function drawLifes() {
  push();
  stroke(0);
  fill(0);
  textSize(40);

  translate(width - 75, 75);
  rect(0, 0, 30, 5);
  if (lifes < 1) text("D", 15, -30);

  translate(-40, 0);
  rect(0, 0, 30, 5);
  if (lifes < 2) text("N", 15, -30);

  translate(-40, 0);
  rect(0, 0, 30, 5);
  if (lifes < 3) text("E", 15, -30);

  pop();
}

function drawCounter() {
  push();
  translate(45, 55);
  stroke(0);
  fill(0);
  textSize(30);
  textAlign(LEFT, CENTER);
  text("Counter: " + counter, 0, 0);
  pop();
}

function drawEndScreen() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);

  noStroke();
  fill("#472D30");
  rect(width / 2 - 200, height / 2 + 100, 400, 100);

  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("New Game", width / 2, height / 2 + 140);
}
