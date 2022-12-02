const loader = require("../utils/loader");

const input = loader.loadInputString();

const points = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
};

const outcomeA = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
};

const outcomeB = {
  AX: 0 + 3,
  AY: 3 + 1,
  AZ: 6 + 2,
  BX: 0 + 1,
  BY: 3 + 2,
  BZ: 6 + 3,
  CX: 0 + 2,
  CY: 3 + 3,
  CZ: 6 + 1,
};

let scoreA = 0;
let scoreB = 0;

for (let i = 0; i < input.length; i++) {
  scoreA += points[input[i][2]] + outcomeA[input[i][0] + input[i][2]];
  scoreB += outcomeB[input[i][0] + input[i][2]];
}

console.log("Part 1:", scoreA);
console.log("Part 2:", scoreB);
