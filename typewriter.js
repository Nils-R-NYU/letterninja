class Typewriter {
  static SHOW_FOR_FRAMES = 5;
  static BAR_WIDTH = 10;
  static SHADOW_OFFSET = { X: 5, Y: 5 };
  static HEAD_LENGTH = 50;
  static NECK_LENGTH = 20;

  constructor(hostArray, letter, x = width / 2, y = height / 2) {
    // To lerp the angle from 45 to -45 we need to provide a number between 0 and 1
    // To get this number I first divided the index of the letter by the length of the alphabet
    // That way A's Typewriter bar would have the angle 45 degress and Z's would have the angle -45 degrees

    // Due to the randomness of the location i kind of realized it looked stupid when the typewriter would hit on the
    // left side of the screen but the bar would come from the right side

    // So i made the angle random but based on the side of the screen.
    // Now the Typewriters bar will always come from the side of the screen its on.

    // Random index between 0 and 12
    const randomLetterIndex = Math.floor(Math.random() * (ALPHABET.length / 2));
    // Add 13 to it if location is on the right side of the screen
    const additionalLetterIndex = x >= width / 2 ? ALPHABET.length / 2 : 0;

    this.angle = lerp(
      45,
      -45,
      (randomLetterIndex + additionalLetterIndex) / (ALPHABET.length - 1)
    );
    this.hostArray = hostArray;
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.frameCounter = 0;
  }

  update() {
    this.frameCounter++;

    if (this.frameCounter > Typewriter.SHOW_FOR_FRAMES) {
      this.kill();
      return;
    }
  }

  kill() {
    this.hostArray.splice(this.hostArray.indexOf(this), 1);
  }

  draw() {
    this.drawBar(true);
    this.drawBar();
  }

  drawBar(isShadow = false) {
    const x = isShadow ? this.x + Typewriter.SHADOW_OFFSET.X : this.x;
    const y =
      (isShadow ? this.y + Typewriter.SHADOW_OFFSET.Y : this.y) +
      Typewriter.HEAD_LENGTH +
      Typewriter.NECK_LENGTH;

    if (isShadow) {
      stroke(0, 0, 0, 100);
      fill(0, 0, 0, 100);
    } else {
      stroke(200);
      fill(200);
    }

    push();
    strokeWeight(0);
    translate(x, y);

    push();
    rotate(radians(this.angle));
    rect(Typewriter.BAR_WIDTH / -2, 0, Typewriter.BAR_WIDTH, height * 2);
    pop();

    strokeWeight(Typewriter.BAR_WIDTH);
    point(0, 0);

    strokeWeight(0);

    translate(0, -Typewriter.NECK_LENGTH);
    rect(
      Typewriter.BAR_WIDTH / -2,
      0,
      Typewriter.BAR_WIDTH,
      Typewriter.NECK_LENGTH
    );

    translate(0, -Typewriter.HEAD_LENGTH);
    rect(
      -Typewriter.BAR_WIDTH,
      0,
      Typewriter.BAR_WIDTH * 2,
      Typewriter.HEAD_LENGTH
    );
    pop();
  }
}
