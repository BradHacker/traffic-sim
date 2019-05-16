const CARS_PER_LANE = 3;
const SPEED_LIMIT = 1;

let track;

function setup() {
  createCanvas(windowWidth, windowHeight);
  track = new Track(CARS_PER_LANE, SPEED_LIMIT);
}

function draw() {
  background(0);
  track.show();
}
