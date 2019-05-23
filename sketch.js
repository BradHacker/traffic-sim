const CARS_PER_LANE = 15,
  SPEED_LIMIT = 2,
  SEEING_DIST = 50;

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
