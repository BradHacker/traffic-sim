class Car {
  constructor(dist, lane, speed) {
    this.dist = dist;
    this.lane = lane;
    this.speed = speed;
    this.width = 10;
    this.height = 20;
  }

  show(x, y) {
    fill(255);
    rectMode(CENTER);
    rect(x, y, this.width, this.height);
  }
}
