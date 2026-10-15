"use strict";

const { createPrayerData } = require("./data");
const { createReport } = require("./report");
const { getStatusSummary } = require("./status");

function getAppData() {
  const days = createPrayerData();

  return {
    days: createReport(days),
    status: getStatusSummary(days)
  };
}

module.exports = { getAppData };
