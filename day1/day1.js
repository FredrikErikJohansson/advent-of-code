const loader = require("../utils/loader");

const input = loader.loadInputRaw().map((i) => parseInt(i));

const elves = [];
let count = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i]) {
    count += input[i];
  } else {
    elves.push(count);
    count = 0;
  }
}

const sortedElves = elves.sort((a, b) => b - a);

console.log("Part 1:", sortedElves[0]);
console.log("Part 2:", sortedElves[0] + sortedElves[1] + sortedElves[2]);
