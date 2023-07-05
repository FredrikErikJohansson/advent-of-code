const loader = require("../utils/loader");
const input = loader.loadInputString();

const monkeyItems = new Map();
const monkeyOperations = new Map();
const monkeyDenominator = new Map();
const monkeyTrueAction = new Map();
const monkeyFalseAction = new Map();
const monkeyInspections = new Map();

const applyOperation = (operation, monkey) => {
  if (operation[0] === "old" && operation[2] === "old") {
    return operation[1] === "+"
      ? monkeyItems.get(monkey)[0] + monkeyItems.get(monkey)[0]
      : monkeyItems.get(monkey)[0] * monkeyItems.get(monkey)[0];
  } else if (operation[0] === "old") {
    return operation[1] === "+"
      ? monkeyItems.get(monkey)[0] + Number(operation[2])
      : monkeyItems.get(monkey)[0] * Number(operation[2]);
  } else if (operation[2] === "old") {
    return operation[1] === "+"
      ? monkeyItems.get(monkey)[0] + Number(operation[0])
      : monkeyItems.get(monkey)[0] * Number(operation[0]);
  }
};

for (let i = 0; i < input.length; i += 6) {
  const ins = input.slice(i, i + 6);
  const monkey = Number(ins[0].split(" ")[1].slice(0, -1));
  const items = ins[1].replace(/ /g, "").slice(14).split(",").map(Number);
  const operations = ins[2].slice(19).split(" ");
  const denominator = Number(ins[3].split(" ").slice(-1)[0]);
  const trueAction = Number(ins[4].split(" ").splice(-1)[0]);
  const falseAction = Number(ins[5].split(" ").splice(-1)[0]);
  monkeyItems.set(monkey, items);
  monkeyOperations.set(monkey, operations);
  monkeyDenominator.set(monkey, denominator);
  monkeyTrueAction.set(monkey, trueAction);
  monkeyFalseAction.set(monkey, falseAction);
  monkeyInspections.set(monkey, 0);
}

for (let i = 0; i < 20; i++) {
  for (let m = 0; m < monkeyItems.size; m++) {
    const items = monkeyItems.get(m).length;
    for (let j = 0; j < items; j++) {
      monkeyInspections.set(m, monkeyInspections.get(m) + Number(1));
      const newValue = Math.floor(
        applyOperation(monkeyOperations.get(m), m) / Number(3)
      );
      monkeyItems.get(m).shift();
      if (newValue % monkeyDenominator.get(m) === 0) {
        monkeyItems.get(monkeyTrueAction.get(m)).push(newValue);
      } else {
        monkeyItems.get(monkeyFalseAction.get(m)).push(newValue);
      }
    }
  }
}

const inspections = [...monkeyInspections.values()].sort((a, b) => b - a);

const result = inspections[0] * inspections[1];
console.log(result);
