const loader = require("../utils/loader");

const input = loader.loadInputRaw();
const setup = [];
const orders = [];
let part = false;

for (let i = 0; i < input.length; i++) {
  if (!Boolean(input[i])) {
    part = true;
    continue;
  }

  if (part) {
    orders.push(input[i]);
  } else {
    setup.push(input[i]);
  }
}

setup.pop();
const containerA = [];
const containerB = [];

for (let i = 0; i < Math.ceil(setup[0].length / 4); i++) {
  containerA.push([]);
  containerB.push([]);
}

setup.forEach((row) => {
  for (let j = 1; j <= row.length; j += 4) {
    if (row[j] !== " ") {
      containerA[Math.ceil(j / 4) - 1].push(row[j]);
      containerB[Math.ceil(j / 4) - 1].push(row[j]);
    }
  }
});

containerA.forEach((col) => col.reverse());
containerB.forEach((col) => col.reverse());

orders.forEach((row) => {
  const commands = row.split(" ");
  const from = parseInt(commands[3] - 1);
  const to = parseInt(commands[5] - 1);
  const count = parseInt(commands[1]);
  const moveA = containerA[from]
    .splice(containerA[from].length - count)
    .reverse();
  const moveB = containerB[from].splice(containerB[from].length - count);
  containerA[to].push(...moveA);
  containerB[to].push(...moveB);
});

let resultA = "";
let resultB = "";
containerA.forEach((col) => (resultA += col.at(-1)));
containerB.forEach((col) => (resultB += col.at(-1)));

console.log("Part 1:", resultA);
console.log("Part 2:", resultB);
