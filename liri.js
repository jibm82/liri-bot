require("dotenv").config();
const fs = require("fs");

let { concertThis } = require("./app/concertThis");
let { logThis } = require("./app/logThis");
let { movieThis } = require("./app/movieThis");
let { spotifyThisSong } = require("./app/spotifyThisSong");

let command = process.argv[2];
let searchParams = undefined;
let appendCurrentDate = true;

if (command === "do-what-it-says") {
  try {
    logThis(`Original command: ${command}`, appendCurrentDate);
    appendCurrentDate = false;

    let arguments = fs.readFileSync("random.txt", "utf-8").split(",");

    command = arguments[0];
    searchParams = arguments[1];
  } catch (error) {
    console.log(error.message);
  }
} else {
  searchParams = process.argv.slice(3).join(" ");
}

logThis(`Command: ${command}`, appendCurrentDate);
logThis(`Search params: ${searchParams}`);

switch (command) {
  case "concert-this":
    concertThis(searchParams, outputResult);
    break;

  case "movie-this":
    movieThis(searchParams, outputResult);
    break;

  case "spotify-this-song":
    spotifyThisSong(searchParams, outputResult);
    break;

  default:
    outputResult("I don't know how to do that");
    break;
}

function outputResult(result) {
  logThis(result);
  console.log(result);
}