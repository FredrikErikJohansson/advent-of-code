const loader = require("../utils/loader");

const input = loader.loadInputString();

let count = 0;

for (let i = 0; i < input.length; i++) {
  let str = input[i].substring(input[i].length / 2);
  for (let j = 0; j < input[i].length / 2; j++) {
    if (str.includes(input[i][j])) {
      const ASCII = input[i][j].charCodeAt(0);
      if (ASCII < 123 && ASCII > 96) {
        count += ASCII - 96;
      } else if (ASCII < 91 && ASCII > 64) {
        count += ASCII - 64 + 26;
      }
      break;
    }
  }
}

console.log("Part 1:", count);

count = 0;
let possible = "";

for (let i = 0; i < input.length; i += 3) {
  let str = input[i];
  for (let j = 0; j < input[i + 1].length; j++) {
    if (str.includes(input[i + 1][j])) {
      possible += input[i + 1][j];
    }
  }

  for (let j = 0; j < possible.length; j++) {
    if (input[i + 2].includes(possible[j])) {
      const ASCII = possible[j].charCodeAt(0);
      if (ASCII < 123 && ASCII > 96) {
        count += ASCII - 96;
      } else if (ASCII < 91 && ASCII > 64) {
        count += ASCII - 64 + 26;
      }
      break;
    }
  }
  possible = "";
}

console.log("Part 2:", count);
