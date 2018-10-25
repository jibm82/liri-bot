const request = require("request");
const keys = require("../keys");

function concertThis(searchParams) {
  let bandsInTownRequestUrl = `https://rest.bandsintown.com/artists/${searchParams}/events?app_id=${keys.bandsInTown.appId}`;

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

exports.concertThis = concertThis;