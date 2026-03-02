let distance = 20;
let n = 35;
let sizes = [];
let points = [];
let conns = [];
let dirs = [];
let eye1pos;
let eye2pos;
let maxTurn; // smaller = stiffer body


function setup() {
  for (let i = 0; i <= n; i++) {
    if (i == 0) {
      sizes[i] = 23;
    }
    if (i == 1) {
      sizes[i] = 27;
    }
    if (i == 2) {
      sizes[i] = 20; //help
    }
    if (i > 2 && i < n) {
      sizes[i] = 17;
    }
    if (i == n) {
      sizes[i] = 15;
    }
  }
  colorMode(HSB);
  createCanvas(1250, 600);
  maxTurn = radians(25);
  points[0] = createVector(0, 0);
  for (let i = 1; i <= n; i++) {
    points[i] = createVector(0.01, 0.01);
  }
  eye1pos = createVector(0.01, 0.01);
  eye2pos = createVector(0.01, 0.01);
}

function draw() {
  background(200, 40, 50);
  points[0].set(mouseX, mouseY);
  for (let i = 0; i < points.length - 1; i++) {
    // Get desired direction (from point[i] to old point[i+1])
    let desired = p5.Vector.sub(points[i + 1], points[i]).normalize();

    if (i > 0) {
      let angleDiff = desired.heading() - dirs[i - 1].heading();
      angleDiff = atan2(sin(angleDiff), cos(angleDiff));
      angleDiff = constrain(angleDiff, -maxTurn, maxTurn);
      dirs[i] = dirs[i - 1].copy().rotate(angleDiff);
    }
    else {
      dirs[i] = desired;
    }
    points[i + 1].set(points[i].x + dirs[i].x * distance,
                      points[i].y + dirs[i].y * distance);
  }
  strokeWeight(1.5);

  stroke(100);
  noFill()
  bodyVertices()

  fill(150, 50, 70);
  noStroke();
  bodyVertices();

  strokeWeight(10);
  stroke(100)
  point(eye1pos.x, eye1pos.y);
  point(eye2pos.x, eye2pos.y);

  // strokeWeight(1);
  // stroke(70);
  // noFill();
  // drawCircles()

  // strokeWeight(3);
  // drawSpine();
}

function bodyVertices() {
  beginShape();
  for (let i = 0; i < points.length; i++) {
    if (i < points.length - 1) {
      if (i == 0) {
        eye1pos.set(
          points[i].x + (sizes[i] * 0.65) * cos(Math.atan2(dirs[i].y, dirs[i].x)
          - PI * (2 / 3)),
          points[i].y + (sizes[i] * 0.65) * sin(Math.atan2(dirs[i].y, dirs[i].x)
          - PI * (2 / 3))
        );
        eye2pos.set(
          points[i].x + (sizes[i] * 0.65) * cos(Math.atan2(dirs[i].y, dirs[i].x)
          + PI * (2 / 3)),
          points[i].y + (sizes[i] * 0.65) * sin(Math.atan2(dirs[i].y, dirs[i].x)
          + PI * (2 / 3))
        );

        // head right side rounding point
        vertex(
          points[i].x +
          sizes[i] * cos(Math.atan2(dirs[i].y, dirs[i].x) - PI * (3 / 4)),
          points[i].y +
          sizes[i] * sin(Math.atan2(dirs[i].y, dirs[i].x) - PI * (3 / 4))
        );

        // head center rounding point
        vertex(
          points[i].x + sizes[i] * cos(Math.atan2(dirs[i].y, dirs[i].x) + PI),
          points[i].y + sizes[i] * sin(Math.atan2(dirs[i].y, dirs[i].x) + PI)
        );

        // head left side rounding point
        vertex(
          points[i].x +
          sizes[i] * cos(Math.atan2(dirs[i].y, dirs[i].x) + PI * (3 / 4)),
          points[i].y +
          sizes[i] * sin(Math.atan2(dirs[i].y, dirs[i].x) + PI * (3 / 4))
        );
      }
      // all points main body shape point on the left side
      // or something idfk i have a DM quiz tomorrow morning
      // that i should probably study for right now
      vertex(
        points[i].x + sizes[i] * cos(Math.atan2(dirs[i].y, dirs[i].x) + PI / 2),
        points[i].y + sizes[i] * sin(Math.atan2(dirs[i].y, dirs[i].x) + PI / 2)
      );
    }
    if (i == points.length - 1) {
      // last point in tail main body point on the left
      vertex(
        points[i].x +
        sizes[i] * cos(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) + PI / 2),
        points[i].y +
        sizes[i] * sin(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) + PI / 2)
      );
      // tail right side rounding point
      vertex(
        points[i].x +
        sizes[i] *
        cos(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) + PI * (1 / 4)),
        points[i].y +
        sizes[i] *
        sin(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) + PI * (1 / 4))
      );

      // tail center rounding point
      vertex(
        points[i].x + sizes[i] * cos(Math.atan2(dirs[i - 1].y, dirs[i - 1].x)),
        points[i].y + sizes[i] * sin(Math.atan2(dirs[i - 1].y, dirs[i - 1].x))
      );

      // tail left side rounding point
      vertex(
        points[i].x +
        sizes[i] *
        cos(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) - PI * (1 / 4)),
        points[i].y +
        sizes[i] *
        sin(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) - PI * (1 / 4))
      );
    }
  }

  for (let i = points.length - 1; i >= 0; i--) {
    if (i > 0) {
      // all points main body shape point on the right side minus the head
      vertex(
        points[i].x +
        sizes[i] * cos(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) - PI / 2),
        points[i].y +
        sizes[i] * sin(Math.atan2(dirs[i - 1].y, dirs[i - 1].x) - PI / 2)
      );
    } else if (i == 0) {
      // head's main body right shape point
      vertex(
        points[i].x + sizes[i] * cos(Math.atan2(dirs[i].y, dirs[i].x) - PI / 2),
        points[i].y + sizes[i] * sin(Math.atan2(dirs[i].y, dirs[i].x) - PI / 2)
      );
    }
  }
  endShape(CLOSE);
}

function drawCircles() {
  for (let i = 0; i < points.length; i++) {
    ellipse(points[i].x, points[i].y, sizes[i] * 2);
  }
}

function drawSpine() {
  for (let i = 0; i < points.length; i++) {
    if (i <= (points.length-2)){
      line(points[i].x, points[i].y, points[i+1].x, points[i+1].y)
    }
  }
}