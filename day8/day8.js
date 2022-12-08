const loader = require("../utils/loader");

const input = loader.loadInputString().map((row) => [...row]);
const visible = {};

const setVisible = (trees, row, col, i, tallest) => {
  if (parseInt(trees[i]) > tallest) {
    if (row !== false) {
      visible[`${row}-${i}`] = true;
    } else {
      visible[`${i}-${col}`] = true;
    }
    return parseInt(trees[i]);
  }
  return tallest;
};

const calcVisible = (trees, row, col) => {
  let tallest = -1;
  for (let i = 0; i < trees.length; i++) {
    tallest = setVisible(trees, row, col, i, tallest);
  }

  // Reverse
  tallest = -1;
  for (let i = trees.length - 1; i >= 0; i--) {
    tallest = setVisible(trees, row, col, i, tallest);
  }
};

// Rows
for (let i = 0; i < input.length; i++) {
  calcVisible(input[i], i, false);
}

// Cols
for (let i = 0; i < input[0].length; i++) {
  const col = [];
  for (let j = 0; j < input.length; j++) {
    col.push(input[j][i]);
  }

  calcVisible(col, false, i);
}

const calcScore = (row, col) => {
  const height = input[row][col];
  let [scoreRight, scoreLeft, scoreUp, scoreDown] = Array(4).fill(0);

  // Right
  for (let i = row + 1; i < input[row].length; i++) {
    scoreRight++;
    if (input[i][col] >= height) {
      break;
    }
  }
  // Left
  for (let i = row - 1; i >= 0; i--) {
    scoreLeft++;
    if (input[i][col] >= height) {
      break;
    }
  }
  // Up
  for (let i = col + 1; i < input.length; i++) {
    scoreUp++;
    if (input[row][i] >= height) {
      break;
    }
  }
  // Down
  for (let i = col - 1; i >= 0; i--) {
    scoreDown++;
    if (input[row][i] >= height) {
      break;
    }
  }
  return scoreRight * scoreLeft * scoreUp * scoreDown;
};

let bestScore = 0;
Object.keys(visible).forEach((tree) => {
  const [i, j] = tree.split("-");
  const score = calcScore(parseInt(i), parseInt(j));
  if (score > bestScore) {
    bestScore = score;
  }
});

console.log("Part 1:", Object.keys(visible).length);
console.log("Part 2:", bestScore);
