"use strict";

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "ramadan-data.json");

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function loadData() {
  if (!fs.existsSync(DATA_FILE)) return null;
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

module.exports = { saveData, loadData, DATA_FILE };
