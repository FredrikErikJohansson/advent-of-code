const loader = require("../utils/loader");

const input = loader.loadInputString();

let countA = 0;
let countB = 0;

input.forEach((pair) => {
  const elf = pair.split(",");
  const sections = elf.map((section) =>
    section.split("-").map((i) => parseInt(i))
  );
  const sectionSizes = sections.map((sectionSize) =>
    Math.abs(sectionSize[0] - sectionSize[1])
  );

  const order =
    sectionSizes[1] < sectionSizes[0]
      ? [sections[1], sections[0]]
      : [sections[0], sections[1]];

  if (order[0][0] >= order[1][0] && order[0][1] <= order[1][1]) {
    countA++;
  }

  if (
    (sections[0][0] <= sections[1][0] && sections[0][1] >= sections[1][1]) ||
    (sections[1][0] <= sections[0][0] && sections[1][1] >= sections[0][1]) ||
    (sections[0][0] <= sections[1][0] &&
      sections[1][0] <= sections[0][1] &&
      sections[0][1] <= sections[1][1]) ||
    (sections[1][0] <= sections[0][0] &&
      sections[0][0] <= sections[1][1] &&
      sections[1][1] <= sections[0][1])
  ) {
    countB++;
  }
});

console.log("Part 1:", countA);
console.log("Part 2:", countB);
