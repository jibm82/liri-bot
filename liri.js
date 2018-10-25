require("dotenv").config();
const fs = require("fs");

let { concertThis } = require("./commands/concertThis");
let { movieThis } = require("./commands/movieThis");
let { spotifyThisSong } = require("./commands/spotifyThisSong");

let command = process.argv[2];
let searchParams = undefined;

if (command === "do-what-it-says") {
  try {
    let arguments = fs.readFileSync("random.txt", "utf-8").split(",");

    command = arguments[0];
    searchParams = arguments[1];
  } catch (error) {
    console.log(error.message);
  }
} else {
  searchParams = process.argv.slice(3).join(" ");
}

switch (command) {
  case "concert-this":
    concertThis(searchParams);
    break;

  case "movie-this":
    movieThis(searchParams);
    break;

  case "spotify-this-song":
    spotifyThisSong(searchParams);
    break;

  default:
    console.log("I don't know how to do that");
    break;
}