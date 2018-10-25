const Spotify = require('node-spotify-api');
const keys = require("../keys");

let spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

function spotifyThisSong(searchParams) {

  spotify.search({ type: 'track', query: searchParams }, (err, data) => {
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

exports.spotifyThisSong = spotifyThisSong;