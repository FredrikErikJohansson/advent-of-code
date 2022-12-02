const fs = require("fs");

module.exports = {
  loadInputRaw: function (path = "./input.txt") {
    return fs.readFileSync(path, { encoding: "utf8" }).split("\n");
  },

  loadInputInt: function (path = "./input.txt") {
    return fs
      .readFileSync(path, { encoding: "utf8" })
      .split("\n")
      .filter((i) => Boolean(i))
      .map((i) => parseInt(i));
  },

  loadInputString: function (path = "./input.txt") {
    return fs
      .readFileSync(path, { encoding: "utf8" })
      .split("\n")
      .filter((i) => Boolean(i));
  },
};
