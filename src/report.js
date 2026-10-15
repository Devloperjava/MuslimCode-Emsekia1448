"use strict";

const { createDayReport } = require("./day-report");

function createReport(days) {
  if (!Array.isArray(days)) {
    throw new Error("Days must be an array");
  }

  return days.map(createDayReport);
}

module.exports = { createReport };
