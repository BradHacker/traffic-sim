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

  calcBrakeForce(dist) {
    return map(1.2 ** (-dist + 20) + 0.5, 0, 40, 0, 1);
  }

  calcAccelForce(dist) {
    return map(1.2 ** (dist - 20) + 0.5, 0, 40, 0, 1);
  }

  think(speedLimit, carAhead, carBehind, carLeft, carRight) {
    if (!carAhead) this.speed += this.speed < speedLimit ? 0.01 : 0;
    else
      this.speed =
        this.speed > 0
          ? this.speed - this.calcBrakeForce(abs(carAhead.deltaD))
          : 0;
    if (carBehind)
      this.speed =
        this.speed < speedLimit
          ? this.speed + this.calcBrakeForce(abs(carBehind.deltaD))
          : speedLimit;
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
