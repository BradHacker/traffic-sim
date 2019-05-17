class Track {
  constructor(carsPerLane, speedLimit) {
    this.carsPerLane = carsPerLane;
    this.speedLimit = speedLimit;
    this.cars = [[], [], []];
    this.width = 700;
    this.height = 200;
    this.laneThickness = 15;
    this.trackThickness = this.laneThickness * 3;
    this.totalDist = (this.width - this.height) * 2 + PI * this.height;
    this.checkpoints = [
      0,
      (this.width - this.height) / 2,
      (this.width - this.height) / 2 + (PI * this.height) / 2,
      (3 * (this.width - this.height)) / 2 + (PI * this.height) / 2,
      (3 * (this.width - this.height)) / 2 + PI * this.height,
      2 * (this.width - this.height) + PI * this.height
    ];
    console.log(this.checkpoints);

    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.carsPerLane; i++) {
        this.cars[lane].push(
          new Car(lane, random(SPEED_LIMIT - SPEED_LIMIT / 2) + SPEED_LIMIT)
        );
      }
    }
    console.log(this.cars);
  }

  update() {
    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.cars[lane].length; i++) {
        this.cars[lane][i].update();
      }
    }
  }

  drawCarInLane(car, lane) {
    push();
    translate(width / 2, height / 2);
    if (car.dist >= this.checkpoints[0] && car.dist < this.checkpoints[1]) {
      translate(
        car.dist,
        -this.height / 2 - this.laneThickness / 2 - this.laneThickness * lane
      );
      car.show(0, 0);
    } else if (
      car.dist >= this.checkpoints[1] &&
      car.dist < this.checkpoints[2]
    ) {
      translate(this.width / 2 - this.height / 2, 0);
      let radius = this.height / 2;
      let angle = (car.dist - this.checkpoints[2]) / radius + PI / 2;
      let laneRadius =
        radius + this.laneThickness / 2 + this.laneThickness * lane;
      let x = laneRadius * cos(angle);
      let y = laneRadius * sin(angle);
      translate(x, y);
      car.heading = angle + PI / 2;
      car.show(0, 0);
    } else if (
      car.dist >= this.checkpoints[2] &&
      car.dist < this.checkpoints[3]
    ) {
      this.heading = PI;
      let xOffest = this.width / 2 - this.height / 2;
      translate(
        xOffest - car.dist + this.checkpoints[2],
        this.height / 2 + this.laneThickness / 2 + this.laneThickness * lane
      );
      car.show(0, 0);
    } else if (
      car.dist >= this.checkpoints[3] &&
      car.dist < this.checkpoints[4]
    ) {
      translate(-this.width / 2 + this.height / 2, 0);
      let radius = this.height / 2;
      let angle = (car.dist - this.checkpoints[3]) / radius + PI / 2;
      let laneRadius =
        radius + this.laneThickness / 2 + this.laneThickness * lane;
      let x = laneRadius * cos(angle);
      let y = laneRadius * sin(angle);
      translate(x, y);
      car.heading = angle + PI / 2;
      car.show(0, 0);
    } else if (
      car.dist >= this.checkpoints[4] &&
      car.dist < this.checkpoints[5]
    ) {
      translate(
        -this.totalDist + car.dist,
        -this.height / 2 - this.laneThickness / 2 - this.laneThickness * lane
      );
      car.show(0, 0);
    } else {
      car.dist = 0;
    }
    pop();
  }

  drawTrack() {
    push();
    translate(width / 2, height / 2);
    stroke(255);
    line(
      -(this.width - this.height) / 2,
      -this.height / 2,
      (this.width - this.height) / 2,
      -this.height / 2
    );
    line(
      -(this.width - this.height) / 2,
      -this.height / 2 - this.trackThickness,
      (this.width - this.height) / 2,
      -this.height / 2 - this.trackThickness
    );
    line(
      -(this.width - this.height) / 2,
      this.height / 2,
      (this.width - this.height) / 2,
      this.height / 2
    );
    line(
      -(this.width - this.height) / 2,
      this.height / 2 + this.trackThickness,
      (this.width - this.height) / 2,
      this.height / 2 + this.trackThickness
    );
    noFill();
    arc(
      this.width / 2 - this.height / 2,
      0,
      this.height,
      this.height,
      -PI / 2,
      PI / 2,
      OPEN
    );
    arc(
      this.width / 2 - this.height / 2,
      0,
      this.height + this.trackThickness * 2,
      this.height + this.trackThickness * 2,
      -PI / 2,
      PI / 2,
      OPEN
    );
    arc(
      -this.width / 2 + this.height / 2,
      0,
      this.height,
      this.height,
      PI / 2,
      -PI / 2,
      OPEN
    );
    arc(
      -this.width / 2 + this.height / 2,
      0,
      this.height + this.trackThickness * 2,
      this.height + this.trackThickness * 2,
      PI / 2,
      -PI / 2,
      OPEN
    );
    pop();
  }

  show() {
    this.drawTrack();

    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.cars[lane].length; i++) {
        this.drawCarInLane(this.cars[lane][i], lane);
      }
    }
  }
}
