require("dotenv").config();
const request = require("request");
const moment = require("moment")
const keys = require("./keys");

let command = process.argv[2];
let params = process.argv.slice(3).join(" ");

if (command === 'concert-this') {
  let bandsInTownRequestUrl = `https://rest.bandsintown.com/artists/${params}/events?app_id=${keys.bandsInTown.appId}`;

  request(bandsInTownRequestUrl, (error, response, body) => {
    let jsonResponse = JSON.parse(body);

    console.log(`I found ${jsonResponse.length} events:`);

    jsonResponse.forEach((event) => {
      console.log(`Venue: ${event.venue.name}`);
      console.log(`Location: ${event.venue.city}, ${event.venue.country}`);
      console.log(`Date: ${event.datetime}`);
      console.log(`----------------------------------`);
    });
  });
}

if (command === 'spotify-this') {
  const Spotify = require('node-spotify-api');

  let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  spotify.search({ type: 'track', query: params }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    data.tracks.items.forEach((trackInfo) => {
      console.log("Artist:", trackInfo.artists.map(({ name }) => name).join(", "));
      console.log("Name:", trackInfo.name);
      console.log("Album:", trackInfo.album.name);
      console.log("Preview URL:", trackInfo.preview_url);
      console.log("--------------------------------");
    });

  });
}