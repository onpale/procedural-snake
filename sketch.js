// =============================
// Configuration
// =============================
let segmentDistance = 20;
let segmentCount = 35;

let segmentSizes = [];
let spinePoints = [];
let segmentDirections = [];

let leftEyePosition;
let rightEyePosition;

let maxTurnAngle; // smaller = stiffer body

// =============================
// Setup
// =============================
function setup() {
    // Define body segment sizes
    for (let i = 0; i <= segmentCount; i++) {
        if (i === 0) segmentSizes[i] = 23; // head base
        if (i === 1) segmentSizes[i] = 27; // head bulge
        if (i === 2) segmentSizes[i] = 20; // neck
        if (i > 2 && i < segmentCount) segmentSizes[i] = 17; // body
        if (i === segmentCount) segmentSizes[i] = 15; // tail tip
    }

    colorMode(HSB);
    createCanvas(1250, 600);

    maxTurnAngle = radians(25);

    // Initialize spine points
    spinePoints[0] = createVector(0, 0);

    for (let i = 1; i <= segmentCount; i++) {
        spinePoints[i] = createVector(0.01, 0.01);
    }

    leftEyePosition = createVector(0.01, 0.01);
    rightEyePosition = createVector(0.01, 0.01);
}

// =============================
// Main Draw Loop
// =============================
function draw() {
    background(200, 40, 50);

    // Head follows mouse
    spinePoints[0].set(mouseX, mouseY);

    // Update body physics
    for (let i = 0; i < spinePoints.length - 1; i++) {
        // Desired direction toward previous position
        let desiredDirection = p5.Vector.sub(
            spinePoints[i + 1],
            spinePoints[i],
        ).normalize();

        if (i > 0) {
            let angleDifference =
                desiredDirection.heading() - segmentDirections[i - 1].heading();

            angleDifference = atan2(sin(angleDifference), cos(angleDifference));

            angleDifference = constrain(
                angleDifference,
                -maxTurnAngle,
                maxTurnAngle,
            );

            segmentDirections[i] = segmentDirections[i - 1]
                .copy()
                .rotate(angleDifference);
        } else {
            segmentDirections[i] = desiredDirection;
        }

        // Position next segment
        spinePoints[i + 1].set(
            spinePoints[i].x + segmentDirections[i].x * segmentDistance,
            spinePoints[i].y + segmentDirections[i].y * segmentDistance,
        );
    }

    // Draw body outline
    strokeWeight(1.5);
    stroke(100);
    noFill();
    drawBodyShape();

    // Fill body
    fill(150, 50, 70);
    noStroke();
    drawBodyShape();

    // Draw eyes
    strokeWeight(10);
    stroke(100);
    point(leftEyePosition.x, leftEyePosition.y);
    point(rightEyePosition.x, rightEyePosition.y);

    // Debug options
    // drawCircles();
    // drawSpine();
}

// =============================
// Body Shape Construction
// =============================
function drawBodyShape() {
    beginShape();

    // ---------- Forward pass (left side) ----------
    for (let i = 0; i < spinePoints.length; i++) {
        if (i < spinePoints.length - 1) {
            let headingAngle = Math.atan2(
                segmentDirections[i].y,
                segmentDirections[i].x,
            );

            if (i === 0) {
                // Eye positions
                leftEyePosition.set(
                    spinePoints[i].x +
                        segmentSizes[i] *
                            0.65 *
                            cos(headingAngle - PI * (2 / 3)),
                    spinePoints[i].y +
                        segmentSizes[i] *
                            0.65 *
                            sin(headingAngle - PI * (2 / 3)),
                );

                rightEyePosition.set(
                    spinePoints[i].x +
                        segmentSizes[i] *
                            0.65 *
                            cos(headingAngle + PI * (2 / 3)),
                    spinePoints[i].y +
                        segmentSizes[i] *
                            0.65 *
                            sin(headingAngle + PI * (2 / 3)),
                );

                // Head rounding points
                vertex(
                    spinePoints[i].x +
                        segmentSizes[i] * cos(headingAngle - PI * (3 / 4)),
                    spinePoints[i].y +
                        segmentSizes[i] * sin(headingAngle - PI * (3 / 4)),
                );

                vertex(
                    spinePoints[i].x + segmentSizes[i] * cos(headingAngle + PI),
                    spinePoints[i].y + segmentSizes[i] * sin(headingAngle + PI),
                );

                vertex(
                    spinePoints[i].x +
                        segmentSizes[i] * cos(headingAngle + PI * (3 / 4)),
                    spinePoints[i].y +
                        segmentSizes[i] * sin(headingAngle + PI * (3 / 4)),
                );
            }

            // Left side body point
            vertex(
                spinePoints[i].x + segmentSizes[i] * cos(headingAngle + PI / 2),
                spinePoints[i].y + segmentSizes[i] * sin(headingAngle + PI / 2),
            );
        }

        // ---------- Tail rounding ----------
        if (i === spinePoints.length - 1) {
            let tailHeading = Math.atan2(
                segmentDirections[i - 1].y,
                segmentDirections[i - 1].x,
            );

            vertex(
                spinePoints[i].x + segmentSizes[i] * cos(tailHeading + PI / 2),
                spinePoints[i].y + segmentSizes[i] * sin(tailHeading + PI / 2),
            );

            vertex(
                spinePoints[i].x +
                    segmentSizes[i] * cos(tailHeading + PI * (1 / 4)),
                spinePoints[i].y +
                    segmentSizes[i] * sin(tailHeading + PI * (1 / 4)),
            );

            vertex(
                spinePoints[i].x + segmentSizes[i] * cos(tailHeading),
                spinePoints[i].y + segmentSizes[i] * sin(tailHeading),
            );

            vertex(
                spinePoints[i].x +
                    segmentSizes[i] * cos(tailHeading - PI * (1 / 4)),
                spinePoints[i].y +
                    segmentSizes[i] * sin(tailHeading - PI * (1 / 4)),
            );
        }
    }

    // ---------- Backward pass (right side) ----------
    for (let i = spinePoints.length - 1; i >= 0; i--) {
        if (i > 0) {
            let headingAngle = Math.atan2(
                segmentDirections[i - 1].y,
                segmentDirections[i - 1].x,
            );

            vertex(
                spinePoints[i].x + segmentSizes[i] * cos(headingAngle - PI / 2),
                spinePoints[i].y + segmentSizes[i] * sin(headingAngle - PI / 2),
            );
        } else {
            let headingAngle = Math.atan2(
                segmentDirections[i].y,
                segmentDirections[i].x,
            );

            vertex(
                spinePoints[i].x + segmentSizes[i] * cos(headingAngle - PI / 2),
                spinePoints[i].y + segmentSizes[i] * sin(headingAngle - PI / 2),
            );
        }
    }

    endShape(CLOSE);
}

// =============================
// Debug Helpers
// =============================
function drawCircles() {
    for (let i = 0; i < spinePoints.length; i++) {
        ellipse(spinePoints[i].x, spinePoints[i].y, segmentSizes[i] * 2);
    }
}

function drawSpine() {
    for (let i = 0; i < spinePoints.length - 1; i++) {
        line(
            spinePoints[i].x,
            spinePoints[i].y,
            spinePoints[i + 1].x,
            spinePoints[i + 1].y,
        );
    }
}
