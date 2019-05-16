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
      (this.width - this.height) / 2 / this.totalDist,
      ((this.width - this.height) / 2 + (PI * this.height) / 2) /
        this.totalDist,
      ((3 * (this.width - this.height)) / 2 + (PI * this.height) / 2) /
        this.totalDist,
      ((3 * (this.width - this.height)) / 2 + PI * this.height) /
        this.totalDist,
      (2 * (this.width - this.height) + PI * this.height) / this.totalDist
    ];
    console.log(this.checkpoints);

    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.carsPerLane; i++) {
        this.cars[lane].push(
          new Car(
            map(i, 0, this.cars.length, 0, 100),
            lane,
            random(SPEED_LIMIT)
          )
        );
      }
    }
  }

  drawAt(percent, lane) {
    push();
    if (percent > this.checkpoints[0] && percent < this.checkpoints[1]) {
      translate(
        (this.width - this.height) / 2,
        -this.height / 2 + (lane + this.laneThickness / 2) * this.laneThickness
      );
    }
    pop();
  }

  show() {
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

    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.carsPerLane; i++) {
        this.cars[lane][i].show(10 * lane, i * this.cars[lane][i].height);
      }
    }
    pop();
  }
}
