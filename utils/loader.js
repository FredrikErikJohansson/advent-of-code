const fs = require("fs");

module.exports = {
  loadInput: function (path = "./input.txt") {
    return fs
      .readFileSync(path, { encoding: "utf8" })
      .split("\n")
      .filter((i) => Boolean(i))
      .map((i) => parseInt(i));
  },
};
