class Letter {
  static LETTER_HEIGHT = 50;
  constructor(lettersArray, onKillFunction) {
    this.lettersArray = lettersArray;
    this.onKillFunction = onKillFunction;

    this.letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    this.pos = createVector(
      width / 4 + (Math.random() * width) / 2,
      height + 50
    );
    let xVel = Math.random() * 3;
    xVel = this.pos.x >= width / 2 ? xVel * -1 : xVel;
    this.vel = createVector(xVel, Math.random() * -5 - 9);
    this.downForce = createVector(0, 0.125);
    this.rotation = 0;
    this.rotationSpeed = Math.random() * 5;
    this.isHit = false;
    this.opacity = 255;
  }

  update() {
    if (this.isHit) return;
    this.vel.add(this.downForce);
    this.pos.add(this.vel);
    this.rotation += this.rotationSpeed;

    if (this.pos.y > height + 50) {
      this.kill();
    }
  }

  draw() {
    if (this.isHit) {
      this.opacity--;
      if (this.opacity < 0) {
        this.lettersArray.splice(this.lettersArray.indexOf(this), 1);
        return;
      }
    }
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.rotation));
    textSize(Letter.LETTER_HEIGHT);
    noStroke();
    fill(this.isHit ? color(90, 80, 62, this.opacity) : color("#3D0814"));
    text(this.letter.toUpperCase(), 0, 0);
    pop();
  }

  remove(typewriterArray) {
    this.isHit = true;
    typewriterArray.push(
      new Typewriter(activeTypewriters, key, this.pos.x, this.pos.y)
    );
  }

  kill() {
    this.lettersArray.splice(this.lettersArray.indexOf(this), 1);
    this.onKillFunction();
  }
}
