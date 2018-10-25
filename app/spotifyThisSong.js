const Spotify = require('node-spotify-api');
const keys = require("../keys");

let spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

function spotifyThisSong(searchParams, callback) {
  spotify.search({ type: 'track', query: searchParams }, (err, data) => {
    let spotifyThisSongResult = "";

    if (err) {
      spotifyThisSongResult = `Error occurred: ${err}`;
    }

    data.tracks.items.forEach((trackInfo) => {
      let artists = trackInfo.artists.map(({ name }) => name).join(", ");

      spotifyThisSongResult += `Artist: ${artists}\n`;
      spotifyThisSongResult += `Name: ${trackInfo.name}\n`;
      spotifyThisSongResult += `Album: ${trackInfo.album.name}\n`;
      spotifyThisSongResult += `Preview URL: ${trackInfo.preview_url}\n`;
      spotifyThisSongResult += "--------------------------------\n";
    });

    if (typeof callback === "function") {
      callback(spotifyThisSongResult);
    }

    return spotifyThisSongResult;
  });
}

exports.spotifyThisSong = spotifyThisSong;