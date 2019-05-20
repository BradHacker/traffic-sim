const CARS_PER_LANE = 5,
  SPEED_LIMIT = 2;

let track = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  track = new Track(CARS_PER_LANE, SPEED_LIMIT);
}

function draw() {
  background(0);
  track.show();
  track.update();
}
