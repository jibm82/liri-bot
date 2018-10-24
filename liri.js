require("dotenv").config();
const request = require("request");
const moment = require("moment")
const keys = require("./keys");

let command = process.argv[2];
let params = process.argv.slice(3).join(" ");
let bandsInTownRequestUrl = `https://rest.bandsintown.com/artists/${params}/events?app_id=${keys.bandsInTown.appId}`;
console.log(params);

request(bandsInTownRequestUrl, (error, response, body) => {
  console.log(body);
  let jsonResponse = JSON.parse(body);
  console.log(`I found ${jsonResponse.length} events:`);
  jsonResponse.forEach((event) => {
    console.log(`Venue: ${event.venue.name}`);
    console.log(`Location: ${event.venue.city}, ${event.venue.country}`);
    console.log(`Date: ${event.datetime}`);
    console.log(`----------------------------------`);
  });
});
