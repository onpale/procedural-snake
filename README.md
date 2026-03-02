# Procedural Snake Animation in p5.js

This is a small experimental sketch I made for fun, messing around with procedural animation in p5.js. It’s a simple and customizable snake animation that moves smoothly, following the mouse, built entirely procedurally rather than using hand-animated frames.

---

## Overview

The snake is made of a series of connected points, each representing a segment of the body. The movement is entirely procedural:

* Segments keep a fixed distance from each other.
* A chain of segments forms the spine of the snake.
* The body’s shape is drawn around the spine using simple math.
* Eyes are added relative to the head segment.
* Angle limits make sure the snake doesn’t bend in ways that look wrong.

---

## Features

* Fully procedural snake animation.
* Spine with multiple connected segments.
* Adjustable sizes for head, body, and tail segments.
* Natural-looking eyes positioned on the head.
* Body maintains its shape while moving.
* Angle constraints prevent overly sharp bends in the spine.

---

## How It Works

### Distance Constraint

Each segment keeps a set distance from its neighbor:

1. The first point is the “head,” which follows the mouse.
2. For every other segment, a vector points toward the previous segment.
3. The vector is scaled to maintain a fixed distance, so the chain stays connected.

---

### Chained Segments

* Multiple segments chained together form the spine.
* Moving the head affects all subsequent segments naturally.
* The order in which constraints are applied slightly changes the behavior.

---

### Body Shape

* Each segment has a radius representing its width.
* Using the radius and the direction of the segment, left and right points are calculated to form the outline of the body.
* Head and tail get extra points to round them nicely.
* The result is a continuous, connected body that moves fluidly along the spine.

---

### Parametric Equations

We use basic parametric equations to calculate points around each segment:

```
x = centerX + radius * cos(angle)
y = centerY + radius * sin(angle)
```

* Left and right sides of the body are at ±90° from the segment’s direction.
* Head and tail rounding uses ±135° and 180° offsets.
* Eyes are placed ±120° from the head direction.

This lets us easily add basically any feature relative to each segment, which makes it customizable and allows for the creation of more complex creatures.

---

### Angle Constraints

* Each segment can only bend a certain amount relative to the previous one.
* This prevents the snake from overlapping itself and keeps the motion looking reasonable.
* It’s a simple way to simulate the stiffness of a spine.

---

## Controls

* **Mouse**: Move the head of the snake.
* The rest of the body follows based on the chained constraints and angle limits.

---

## Possible Next Steps

Even though this was just a small, casual project, the system could be extended to:

* Add features like fins and tails for a procedural fish.
* Add legs using simple inverse kinematics for lizards or quadrupeds.
* Make something a bit more mechanical like a train.
* Change segment widths dynamically to create different body shapes.
* Experiment with multiple chains for more complicated creatures.
