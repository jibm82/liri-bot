const request = require("request");
const keys = require("../keys");

function movieThis(movieName, callback) {
  if (!movieName) {
    movieName = "Mr Nobody";
  }

  const ombdUrl = `http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${movieName}`;
  let movieThisResponse = "";

  request(ombdUrl, (error, response, body) => {
    if (!error) {
      let jsonBody = JSON.parse(body);

      if (jsonBody.Error) {
        movieThisResponse = `Error: ${jsonBody.Error}`;
      } else {

        movieThisResponse += `Title: ${jsonBody.Title}\n`;
        movieThisResponse += `Year: ${jsonBody.Year}\n`;
        movieThisResponse += `Imdb Rating: ${jsonBody.imdbRating}\n`;
        movieThisResponse += `Rotten Tomatoes Rating: ${rottenTomatoesRating(jsonBody.Ratings)}\n`;
        movieThisResponse += `Country: ${jsonBody.Country}\n`;
        movieThisResponse += `Language: ${jsonBody.Language}\n`;
        movieThisResponse += `Plot: ${jsonBody.Plot}\n`;
        movieThisResponse += `Actors: ${jsonBody.Actors}`;
      }
    } else {
      movieThisResponse = "There was an error retrieving the info";
    }

    if (typeof callback === "function") {
      callback(movieThisResponse);
    }

    return movieThisResponse;
  });
}

function rottenTomatoesRating(ratings) {
  let rottenTomatoesRating = "N/A";

  ratings.forEach((rating) => {
    if (rating.Source === "Rotten Tomatoes") {
      rottenTomatoesRating = rating.Value;
    }
  });

  return rottenTomatoesRating;
}

exports.movieThis = movieThis;