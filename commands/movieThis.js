const request = require("request");
const keys = require("../keys");

function movieThis(movieName) {
  const ombdUrl = `http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${movieName}`;

  request(ombdUrl, (error, response, body) => {
    if (!error) {
      let jsonBody = JSON.parse(body);

      if (jsonBody.Error) {
        console.log("Error:", jsonBody.Error);
      } else {
        console.log("Title: ", jsonBody.Title);
        console.log("Year:", jsonBody.Year);
        console.log("Imdb Rating:", jsonBody.imdbRating);
        console.log("Rotten Tomatoes Rating:", rottenTomatoesRating(jsonBody.Ratings));
        console.log("Country:", jsonBody.Country);
        console.log("Language:", jsonBody.Language);
        console.log("Plot:", jsonBody.Plot);
        console.log("Actors:", jsonBody.Actors);
      }
    } else {
      console.log("There was an error retrieving the info.")
    }
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