const loader = require("../utils/loader");
const input = loader.loadInputString();

const nodes = [
  { x: 0, y: 0 }, // Head
  { x: 0, y: 0 }, // 1
  { x: 0, y: 0 }, // 2
  { x: 0, y: 0 }, // 3
  { x: 0, y: 0 }, // 4
  { x: 0, y: 0 }, // 5
  { x: 0, y: 0 }, // 6
  { x: 0, y: 0 }, // 7
  { x: 0, y: 0 }, // 8
  { x: 0, y: 0 }, // 9
];

// Part 1
// const maxDepth = 1;
// Part 2
const maxDepth = 9;

const tailVisits = new Set();

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const distanceHorizontal = (head, tail) => head.x - tail.x;
const distanceVertical = (head, tail) => head.y - tail.y;
const distanceDiagonal = (head, tail) => {
  return {
    x: distanceHorizontal(head, tail),
    y: distanceVertical(head, tail),
  };
};

// Calculates next step for current node
const calcStep = (direction, depth) => {
  let isX = false;

  // Move head
  if (depth === 1) {
    switch (direction) {
      case "R":
        nodes[depth - 1].x += 1;
        break;
      case "L":
        nodes[depth - 1].x -= 1;
        break;
      case "U":
        nodes[depth - 1].y += 1;
        break;
      case "D":
        nodes[depth - 1].y -= 1;
        break;
    }
  }

  // Calculate deltas
  let deltaX = distanceHorizontal(nodes[depth - 1], nodes[depth]);
  let deltaY = distanceVertical(nodes[depth - 1], nodes[depth]);
  let deltaXY = distanceDiagonal(nodes[depth - 1], nodes[depth]);

  let shouldMoveDiagonal =
    (Math.abs(deltaXY.x) > 1 || Math.abs(deltaXY.y) > 1) &&
    deltaX !== 0 &&
    deltaY !== 0;

  // Previous node direction was diagonal
  if (direction === "X") {
    while (shouldMoveDiagonal || Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
      if (shouldMoveDiagonal) {
        nodes[depth].x += clamp(deltaXY.x, -1, 1);
        nodes[depth].y += clamp(deltaXY.y, -1, 1);
        isX = true;
      } else if (Math.abs(deltaX) > 1) {
        nodes[depth].x += clamp(deltaX, -1, 1);
      } else if (Math.abs(deltaY) > 1) {
        nodes[depth].y += clamp(deltaY, -1, 1);
      }

      // Recalculate deltas
      deltaX = distanceHorizontal(nodes[depth - 1], nodes[depth]);
      deltaY = distanceVertical(nodes[depth - 1], nodes[depth]);
      deltaXY = distanceDiagonal(nodes[depth - 1], nodes[depth]);
      shouldMoveDiagonal =
        (Math.abs(deltaXY.x) > 1 || Math.abs(deltaXY.y) > 1) &&
        deltaX !== 0 &&
        deltaY !== 0;
    }
  } else if (shouldMoveDiagonal) {
    nodes[depth].x += clamp(deltaXY.x, -1, 1);
    nodes[depth].y += clamp(deltaXY.y, -1, 1);
    isX = true;
  } else if (direction === "R" || direction === "L") {
    if (Math.abs(deltaX) > 1) nodes[depth].x += clamp(deltaX, -1, 1);
  } else if (direction === "U" || direction === "D") {
    if (Math.abs(deltaY) > 1) nodes[depth].y += clamp(deltaY, -1, 1);
  }

  // Check if tail is reached and store its position
  // Otherwise, continue recursion
  if (depth === maxDepth) {
    tailVisits.add(`${nodes[depth].x},${nodes[depth].y}`);
  } else {
    calcStep(isX ? "X" : direction, depth + 1);
  }
};

for (let i = 0; i < input.length; i++) {
  const move = input[i].split(" ");
  const direction = move[0];
  const distance = parseInt(move[1]);
  for (let j = 0; j < distance; j++) {
    calcStep(direction, 1);
  }
}

console.log("Result:", tailVisits.size);
