"use strict";

const { getAppData } = require("./app-data");

function startApp() {
  const data = getAppData();

  console.log("Ramadan Emsakiah 2027");
  console.log("Days:", data.status.total);
  console.log("Retrieved:", data.status.retrieved);
  console.log("Pending:", data.status.pending);
  console.log("Offline:", data.status.offline);

  return data;
}

module.exports = { startApp };
