const fs = require("fs");
const moment = require("moment");
const logFile = "log.txt";

function logThis(text, prependDate = false) {
  if (prependDate) {
    let currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    fs.appendFileSync(logFile, `---> ${currentDate}\n`);
  }

  fs.appendFileSync(logFile, `${text}\n`);
}

exports.logThis = logThis;