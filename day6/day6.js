const loader = require("../utils/loader");

const input = loader.loadInputString()[0];

const isUnique = (s) => {
  const obj = {};
  for (const c of s) {
    if (obj[c]) return false;
    obj[c] = true;
  }
  return true;
};

const findMarker = (s, start, marker) => {
  for (let i = start; i < s.length; i++) {
    marker.push(s[i]);
    if (marker.length > start + 1) {
      marker.shift();
    }
    if (isUnique(marker)) {
      return i + 1;
    }
  }
};

console.log("Part 1:", findMarker(input, 3, [...input.substring(0, 3)]));
console.log("Part 2:", findMarker(input, 13, [...input.substring(0, 13)]));
