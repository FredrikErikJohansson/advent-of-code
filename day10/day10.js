const loader = require("../utils/loader");
const input = loader.loadInputString();

const cycles = new Map();
const screen = [];
cycles.set(1, 1);
let cycle = 2;

// Light pixel if register is within 1 of the cycle row
const insertPixel = () => {
  if (Math.abs(cycles.get(cycle - 1) - ((cycle - 2) % 40)) <= 1) {
    screen.push("#");
  } else {
    screen.push(".");
  }
};

for (let i = 0; i < input.length; i++) {
  const instruction = input[i].split(" ");
  const action = instruction[0];
  const value = instruction[1];
  if (action === "addx") {
    cycles.set(cycle, cycles.get(cycle - 1));
    insertPixel();
    cycle++;
    cycles.set(cycle, cycles.get(cycle - 1) + parseInt(value));
    insertPixel();
    cycle++;
  } else {
    cycles.set(cycle, cycles.get(cycle - 1));
    insertPixel();
    cycle++;
  }
}

console.log(
  "Part 1:",
  cycles.get(20) * 20 +
    cycles.get(60) * 60 +
    cycles.get(100) * 100 +
    cycles.get(140) * 140 +
    cycles.get(180) * 180 +
    cycles.get(220) * 220
);

const chunkSize = 40;
console.log("Part 2:");
for (let i = 0; i < screen.length; i += chunkSize) {
  const chunk = screen.slice(i, i + chunkSize);
  console.log(chunk.join(""));
}
