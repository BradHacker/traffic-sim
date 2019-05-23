class Car {
  constructor(dist, lane, speed) {
    this.dist = dist;
    this.lane = lane;
    this.speed = speed;
    this.width = 10;
    this.length = 20;
    this.heading = 0;
    this.userControlled = false;
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

  applyForce(amt) {
    this.speed += amt;
  }

  think(speedLimit, carAhead, carBehind, carLeft, carRight) {
    if (this.userControlled) return;
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
    if (this.userControlled) fill(255, 50, 200);
    else if (this.speed == SPEED_LIMIT) fill(100, 255, 255);
    else fill(255);
    rectMode(CENTER);
    rotate(this.heading);
    rect(0, 0, this.length, this.width);
    pop();
  }
}
