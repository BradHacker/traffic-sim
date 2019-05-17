class Car {
  constructor(lane, speed) {
    this.dist = 0;
    this.lane = lane;
    this.speed = speed;
    this.width = 10;
    this.length = 20;
    this.heading = 0;
  }

  update() {
    this.dist += this.speed;
  }

  show() {
    push();
    fill(255);
    rectMode(CENTER);
    rotate(this.heading);
    rect(0, 0, this.length, this.width);
    pop();
  }
}
