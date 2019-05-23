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
      let possibleStartDists = [];
      for (let d = 0; d < this.totalDist - 25; d += 25) {
        possibleStartDists.push(d);
      }
      //console.log(possibleStartDists);
      for (let i = 0; i < this.carsPerLane; i++) {
        let randomStart = floor(random(possibleStartDists.length));
        this.cars[lane].push(
          new Car(possibleStartDists[randomStart], lane, SPEED_LIMIT / 2)
        );
        possibleStartDists.splice(randomStart, 1);
      }
    }
    console.log(this.cars);
  }

  update() {
    for (let lane = 0; lane < this.cars.length; lane++) {
      for (let i = 0; i < this.cars[lane].length; i++) {
        let around = this.getCarsAround(this.cars[lane][i]);
        this.cars[lane][i].think(
          this.speedLimit,
          around.carAhead,
          around.carBehind
        );
        this.cars[lane][i].update();
      }
    }
  }

  getCarsAround(car) {
    let l = car.lane;
    // console.log(`Lane: ${l}`);
    let carAhead = null;
    let carBehind = null;

    let carDists = this.cars[l].map(c => {
      return {
        car: c,
        deltaD: (c.dist % this.totalDist) - (car.dist % this.totalDist)
      };
    });
    carDists = carDists.sort((a, b) => b.deltaD - a.deltaD);
    // console.log(carDists);
    const carIndex = carDists.findIndex(v => v.deltaD == 0);
    carAhead =
      carIndex > 0 ? carDists[carIndex - 1] : carDists[carDists.length - 1];
    carBehind =
      carIndex < carDists.length - 1 ? carDists[carIndex + 1] : carDists[0];

    if (abs(carAhead.deltaD) > SEEING_DIST) carAhead = null;
    if (abs(carBehind.deltaD) > SEEING_DIST) carBehind = null;

    return {
      carAhead,
      carBehind
    };
  }

  drawCarInLane(car, lane) {
    const displayDist = car.dist % this.totalDist;
    push();
    translate(width / 2, height / 2);
    if (
      displayDist >= this.checkpoints[0] &&
      displayDist < this.checkpoints[1]
    ) {
      translate(
        displayDist,
        -this.height / 2 - this.laneThickness / 2 - this.laneThickness * lane
      );
      car.show(0, 0);
    } else if (
      displayDist >= this.checkpoints[1] &&
      displayDist < this.checkpoints[2]
    ) {
      translate(this.width / 2 - this.height / 2, 0);
      let radius = this.height / 2;
      let angle = (displayDist - this.checkpoints[2]) / radius + PI / 2;
      let laneRadius =
        radius + this.laneThickness / 2 + this.laneThickness * lane;
      let x = laneRadius * cos(angle);
      let y = laneRadius * sin(angle);
      translate(x, y);
      car.heading = angle + PI / 2;
      car.show(0, 0);
    } else if (
      displayDist >= this.checkpoints[2] &&
      displayDist < this.checkpoints[3]
    ) {
      this.heading = PI;
      let xOffest = this.width / 2 - this.height / 2;
      translate(
        xOffest - displayDist + this.checkpoints[2],
        this.height / 2 + this.laneThickness / 2 + this.laneThickness * lane
      );
      car.show(0, 0);
    } else if (
      displayDist >= this.checkpoints[3] &&
      displayDist < this.checkpoints[4]
    ) {
      translate(-this.width / 2 + this.height / 2, 0);
      let radius = this.height / 2;
      let angle = (displayDist - this.checkpoints[3]) / radius + PI / 2;
      let laneRadius =
        radius + this.laneThickness / 2 + this.laneThickness * lane;
      let x = laneRadius * cos(angle);
      let y = laneRadius * sin(angle);
      translate(x, y);
      car.heading = angle + PI / 2;
      car.show(0, 0);
    } else if (
      displayDist >= this.checkpoints[4] &&
      displayDist < this.checkpoints[5]
    ) {
      translate(
        -this.totalDist + displayDist,
        -this.height / 2 - this.laneThickness / 2 - this.laneThickness * lane
      );
      car.show(0, 0);
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
