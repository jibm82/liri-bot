const request = require("request");
const moment = require("moment");
const keys = require("../keys");

function concertThis(searchParams, callback) {

  let bandsInTownRequestUrl = `https://rest.bandsintown.com/artists/${searchParams}/events?app_id=${keys.bandsInTown.appId}`;
  let concertThisResponse = "";

  request(bandsInTownRequestUrl, (error, response, body) => {
    let jsonResponse = JSON.parse(body);

    if (!jsonResponse.message) {

      concertThisResponse += `I found ${jsonResponse.length} events:\n\n`;

      jsonResponse.forEach((event) => {
        concertThisResponse += `Venue: ${event.venue.name}\n`;
        concertThisResponse += `Location: ${event.venue.city}, ${event.venue.country}\n`;
        concertThisResponse += `Date: ${moment(event.datetime).format("MM/DD/YYYY")}\n`;
        concertThisResponse += "----------------------------------\n";
      });
    } else {
      concertThisResponse = jsonResponse.message;
    }

    if (typeof callback === "function") {
      callback(concertThisResponse);
    }

    return concertThisResponse;
  });
}

exports.concertThis = concertThis;