"use strict";

function getStatusSummary(days) {
  if (!Array.isArray(days)) {
    throw new Error("Days must be an array");
  }

  return {
    total: days.length,
    retrieved: days.filter(day => day.status === "retrieved").length,
    pending: days.filter(day => day.status === "pending").length,
    offline: days.filter(day => day.status === "offline").length
  };
}

module.exports = { getStatusSummary };
