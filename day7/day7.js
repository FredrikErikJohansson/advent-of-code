const loader = require("../utils/loader");

const input = loader
  .loadInputString()
  .filter((line) => line.substring(0, 3) !== "dir");

const fileSystem = {};
let currentPath = "";

for (let i = 1; i < input.length; i++) {
  const commands = input[i].split(" ");
  if (commands[0] === "$") {
    if (commands[1] === "cd") {
      if (commands[2] === "..") {
        // Move back
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      } else {
        // Change path
        currentPath += "/" + commands[2];
      }
    } else if (commands[1] === "ls") {
      // Create path
      if (!fileSystem[currentPath]) {
        fileSystem[currentPath] = 0;
      }
    }
  } else {
    // Add size
    if (fileSystem[currentPath]) {
      fileSystem[currentPath] += parseInt(commands[0]);
    } else {
      fileSystem[currentPath] += parseInt(commands[0]);
    }
  }
}

// Replace root
fileSystem["/"] = fileSystem[""];
delete fileSystem[""];

const fileSystemTotal = {};

Object.keys(fileSystem).forEach((dir) => {
  const sum = Object.entries(fileSystem)
    .filter(([k, _]) => k.startsWith(dir))
    .reduce((sum, [_, v]) => sum + v, 0);
  fileSystemTotal[dir] = sum;
});

const totalSize = Object.values(fileSystemTotal)
  .filter((v) => v <= 100000)
  .reduce((sum, a) => sum + a, 0);

const neededSpace = 30000000 - (70000000 - fileSystemTotal["/"]);
const smallestSize = Object.values(fileSystemTotal)
  .filter((v) => v >= neededSpace)
  .sort((a, b) => a - b)[0];

console.log("Part 1:", totalSize);
console.log("Part 2:", smallestSize);
