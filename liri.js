require("dotenv").config();
let { concertThis } = require("./commands/concertThis");
let { movieThis } = require("./commands/movieThis");
let { spotifyThis } = require("./commands/spotifyThis");

let command = process.argv[2];
let searchParams = process.argv.slice(3).join(" ");

switch (command) {
  case "concert-this":
    concertThis(searchParams);
    break;

  case "movie-this":
    movieThis(searchParams);
    break;

  case "spotify-this":
    spotifyThis(searchParams);
    break;

  default:
    console.log("I don't know how to do that");
    break;
}