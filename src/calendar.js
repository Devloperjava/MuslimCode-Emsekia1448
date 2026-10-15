"use strict";

const ramadan = require("./ramadan");

function generateCalendar() {
  const start = new Date(`${ramadan.expectedStartDate}T00:00:00Z`);
  const days = [];

  for (let i = 0; i < ramadan.days; i++) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + i);

    days.push({
      day: i + 1,
      date: date.toISOString().slice(0, 10)
    });
  }

  return days;
}

module.exports = { generateCalendar };
