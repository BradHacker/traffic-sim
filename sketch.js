const CARS_PER_LANE = 15,
  SPEED_LIMIT = 2,
  SEEING_DIST = 50;

let track = null;
let userCar = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  track = new Track(CARS_PER_LANE, SPEED_LIMIT);
  userCar = new Car(5, 1, SPEED_LIMIT / 2);
  userCar.userControlled = true;
  track.cars[1].push(userCar);
}

function draw() {
  if (keyIsPressed) {
    if (keyCode == UP_ARROW) userCar.applyForce(0.01);
    if (keyCode == DOWN_ARROW) userCar.applyForce(-0.01);
  }
  background(0);
  track.show();
  track.update();
}
