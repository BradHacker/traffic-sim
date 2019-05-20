class Car {
  constructor(dist, lane, speed) {
    this.dist = dist;
    this.lane = lane;
    this.speed = speed;
    this.width = 10;
    this.length = 20;
    this.heading = 0;
  }

  distToCar(car) {
    return car.dist - this.dist;
  }

  think(speedLimit, carAhead, carBehind, carLeft, carRight) {
    if (carAhead && this.distToCar(carAhead) < this.length * 2) {
      this.speed -= 1 / this.distToCar(carAhead);
      if (this.speed < 0) this.speed = 0;
      console.log(this.distToCar(carAhead), this.speed);
    }
    if (carBehind && this.distToCar(carBehind) < this.length * 1) {
      this.speed += map(this.distToCar(carAhead), 0, this.length * 2, 1, 0);
      if (this.speed > speedLimit) this.speed = speedLimit;
    }
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
