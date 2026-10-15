"use strict";

const { formatDay } = require("./format-data");

function createDayReport(day) {
  if (!day || typeof day !== "object") {
    throw new Error("Invalid day");
  }

  const formatted = formatDay(day);

  return {
    day: formatted.day,
    date: formatted.date,
    status: formatted.status,
    prayers: formatted.prayers
  };
}

module.exports = { createDayReport };
