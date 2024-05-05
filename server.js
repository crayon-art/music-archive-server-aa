const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":
          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Server Endpoints
    const url = req.url.split('/');

    function getCurrentDateTime() {
      const now = new Date();
      const currentDateTime = now.toISOString();

      return currentDateTime;
    }

    //1. Get all the artists
    //GET /artists
    if (req.method==='GET' && req.url==='/artists'){
      res.statusCode=200;
      res.setHeader ("Content-Type","application/json");
      res.write(JSON.stringify(Object.values(artists)));
      return res.end();
    }

    //2. Get a specific artist's details based on artistId
    //GET /artists/:artistId
    if (req.method==='GET' && url.length===3 && url[1]==="artists"){
      for (let i=0; i<(Object.values(artists)).length;i++){
        if ((Object.values(artists))[i].artistId===Number(url[2])){
          break;
        }
        else if((Object.values(artists))[i].artistId!==Number(url[2])&&i===(Object.values(artists)).length-1){
          res.statusCode=404;
          res.setHeader ("Content-Type","application/json");
          res.write("Artist not found");
          return res.end();
        }
      }
      const filteredArtist = Object.values(artists).filter((anArtist)=>{
        return anArtist.artistId===Number(url[2]);
      });

      const artistAlbums=[];

      for (let album of Object.values(albums)){
        if(album.artistId===Number(url[2])){
          artistAlbums.push(album);
        }
      }

      filteredArtist[0]["albums"]=artistAlbums;

      res.statusCode=200;
      res.setHeader ("Content-Type","application/json");
      res.write(JSON.stringify(filteredArtist[0]));
      return res.end();
    }


    //3. Add an artist
    //POST /artists
    if (req.method==='POST' && req.url==="/artists"){
      const   {name} = req.body;
      const newArtistId=getNewArtistId();
      const newArtist = {
        artistId:newArtistId,
        name: name
      };
      artists[`${newArtistId}`] = newArtist;

      res.statusCode=201;
      res.setHeader ("Content-Type","application/json");
      res.write(JSON.stringify(newArtist));
      return res.end();
    }

    //4. Edit a specified artist by artistId
    //PUT /artists/:artistId
    if (req.method==='PUT' && url.length===3 && url[1]==="artists"){
      const   {name} = req.body;

      for (let artist of Object.values(artists)){
        if(artist.artistId===Number(url[2])){

          artists[url[2]].name=name;

          const editedArtist = {
            name:name,
            artistId:Number(url[2]),
            updatedAt:getCurrentDateTime()
          }

          res.statusCode=200;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(editedArtist));
          return res.end();
        }
        else if((artist.artistId===Object.values(artists)[Object.values(artists).length-1].artistId)&&artist.artistId!==Number(url[2])){
          res.statusCode=404;
          res.setHeader ("Content-Type","application/json");
          res.write("Artist not found");
          return res.end();
        }
      }
    }

    //5. Delete a specified artist by artistId
        //DELETE /artists/:artistId
        if (req.method==='DELETE' && url.length===3 && url[1]==="artists"){

          for (let artist of Object.values(artists)){
            if(artist.artistId===Number(url[2])){

              delete artists[url[2]];

              res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify({Message:`Successfully deleted artist: ${artist.name}`}));
              return res.end();
            }
            else if((artist.artistId===Object.values(artists)[Object.values(artists).length-1].artistId)&&artist.artistId!==Number(url[2])){
              res.statusCode=404;
              res.setHeader ("Content-Type","application/json");
              res.write("Artist not found");
              return res.end();
            }
          }
        }


    //6. Get all albums of a specific artist based on artistId
          //GET /artists/:artistId/albums
          if (req.method==='GET' && url.length===4 && url[3]==="albums"){
            const artistAlbums =[];
            for (let album of Object.values(albums)){

              if((album.albumId===Object.values(albums)[Object.values(albums).length-1].albumId)&&album.artistId!==Number(url[2])){
                res.statusCode=404;
                res.setHeader ("Content-Type","application/json");
                res.write("Artist not found");
                return res.end();
              }

               else if(album.artistId===Number(url[2])){
                artistAlbums.push(album);
              }
            }
            res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify(artistAlbums));
              return res.end();
          }

    //7. Get a specific album's details based on albumId
        //GET /albums/:albumId
        if (req.method==='GET' && url.length===3 && url[1]==="albums"){

          if(Object.keys(albums).length===0) {
            res.statusCode=404;
            res.setHeader ("Content-Type","application/json");
            res.write("No album available");
            return res.end();
          }

          for (let i=0; i<(Object.values(albums)).length;i++){
            if ((Object.values(albums))[i].albumId===Number(url[2])){
              break;
            }
            else if((Object.values(albums))[i].albumId!==Number(url[2])&&i===(Object.values(albums)).length-1){
              res.statusCode=404;
              res.setHeader ("Content-Type","application/json");
              res.write("Album not found");
              return res.end();
            }
          }
          const filteredAlbum = Object.values(albums).filter((anAlbum)=>{
            return anAlbum.albumId===Number(url[2]);
          });

          const albumSongs=[];

          for (let song of Object.values(songs)){
            if(song.albumId===Number(url[2])){
              albumSongs.push(song);
            }
          }

          filteredAlbum[0]["artist"]=artists[url[2]];

          filteredAlbum[0]["songs"]=albumSongs;

          res.statusCode=200;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(filteredAlbum[0]));
          return res.end();
        }

    //8. Add an album to a specific artist based on artistId
        //POST /artists/:artistId/albums
        if (req.method==='POST' && url.length===4 && url[3]==="albums"){
          const   {name} = req.body;
          const newAlbumId=getNewAlbumId();
          const newAlbum = {
            albumId: newAlbumId,
            name: name,
            artistId: Number(url[2])
          };
          albums[`${newAlbumId}`] = newAlbum;

          res.statusCode=201;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(newAlbum));
          return res.end();
        }

    //9. Edit a specified album by albumId
    //PUT /albums/:albumId
    if (req.method==='PUT' && url.length===3 && url[1]==="albums"){
      const   {name} = req.body;

      for (let album of Object.values(albums)){
        if(album.albumId===Number(url[2])){

          albums[url[2]].name=name;

          const editedAlbum = {
            name:name,
            albumId:Number(url[2]),
            updatedAt:getCurrentDateTime()
          }

          res.statusCode=200;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(editedAlbum));
          return res.end();
        }
        else if((album.albumId===Object.values(albums)[Object.values(albums).length-1].albumId)&&album.albumId!==Number(url[2])){
          res.statusCode=404;
          res.setHeader ("Content-Type","application/json");
          res.write("Album not found");
          return res.end();
        }
      }
    }

    //10. Delete a specified album by albumId
        //DELETE /albums/:albumId
        if (req.method==='DELETE' && url.length===3 && url[1]==="albums"){

          for (let album of Object.values(albums)){
            if(album.albumId===Number(url[2])){

              delete albums[url[2]];

              res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify({Message:`Successfully deleted album: ${album.name}`}));
              return res.end();
            }
            else if((album.albumId===Object.values(albums)[Object.values(albums).length-1].albumId)&&album.albumId!==Number(url[2])){
              res.statusCode=404;
              res.setHeader ("Content-Type","application/json");
              res.write("Album not found");
              return res.end();
            }
          }
        }

    //11. Get all songs of a specific artist based on artistId
          //GET /artists/:artistId/songs
          if (req.method==='GET' && url.length===4 && url[3]==="songs"){
            const artistSongs =[];
            for (let song of Object.values(songs)){

              if((song.songId===Object.values(songs)[Object.values(songs).length-1].songId)&&albums[(song.albumId)].artistId!==Number(url[2])){
                res.statusCode=404;
                res.setHeader ("Content-Type","application/json");
                res.write("Song not found");
                return res.end();
              }

               else if(albums[(song.albumId)].artistId===Number(url[2])){
                artistSongs.push(song);
              }
            }
            res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify(artistSongs));
              return res.end();
          }

    //12. Get all songs of a specific album based on albumId
          //GET /albums/:albumId/songs
          if (req.method==='GET' && url.length===4 && url[3]==="songs"){
            const albumSongs =[];
            for (let song of Object.values(songs)){

              if((song.songId===Object.values(songs)[Object.values(songs).length-1].songId)&&song.albumId!==Number(url[2])){
                res.statusCode=404;
                res.setHeader ("Content-Type","application/json");
                res.write("Song not found");
                return res.end();
              }

               else if(song.albumId===Number(url[2])){
                albumSongs.push(song);
              }
            }
            res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify(albumSongs));
              return res.end();
          }

    //13. Get all songs of a specified trackNumber
          //GET /trackNumbers/:trackNumberId/songs
          if (req.method==='GET' && url.length===4 && url[3]==="songs"){
            const trackNumberSongs =[];
            for (let song of Object.values(songs)){

              if((song.songId===Object.values(songs)[Object.values(songs).length-1].songId)&&song.trackNumber!==Number(url[2])){
                res.statusCode=404;
                res.setHeader ("Content-Type","application/json");
                res.write("Song not found");
                return res.end();
              }

               else if(song.trackNumber===Number(url[2])){
                trackNumberSongs.push(song);
              }
            }
            res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify(trackNumberSongs));
              return res.end();
          }

    //14. Get a specific song's details based on songId
        //GET /songs/:songId
        if (req.method==='GET' && url.length===3 && url[1]==="songs"){

          if(Object.keys(songs).length===0) {
            res.statusCode=404;
            res.setHeader ("Content-Type","application/json");
            res.write("No song available");
            return res.end();
          }

          for (let i=0; i<(Object.values(songs)).length;i++){
            if ((Object.values(songs))[i].songId===Number(url[2])){
              break;
            }
            else if((Object.values(songs))[i].songId!==Number(url[2])&&i===(Object.values(songs)).length-1){
              res.statusCode=404;
              res.setHeader ("Content-Type","application/json");
              res.write("Song not found");
              return res.end();
            }
          }
          const filteredSong = Object.values(songs).filter((song)=>{
            return song.songId===Number(url[2]);
          });

          filteredSong[0]["album"]=albums[filteredSong[0].albumId];

          filteredSong[0]["artist"]=artists[albums[filteredSong[0].albumId].artistId];

          res.statusCode=200;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(filteredSong[0]));
          return res.end();
        }

    //15. Add a song to a specific album based on albumId
        //POST /albums/:albumId/songs
        if (req.method==='POST' && url.length===4 && url[3]==="songs"){
          const   {name, lyrics, trackNumber} = req.body;
          const newSongId=getNewSongId();
          const newSong = {
            songId: newSongId,
            name: name,
            trackNumber: trackNumber,
            albumId:Number(url[2]),
            lyrics: lyrics
          };

          songs[`${newSongId}`] = newSong;

          res.statusCode=201;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(newSong));
          return res.end();
        }

    //16. Edit a specified song by songId
    //PUT /songs/:songId
    if (req.method==='PUT' && url.length===3 && url[1]==="songs"){
      const   {name, lyrics, trackNumber} = req.body;

      for (let song of Object.values(songs)){
        if(song.songId===Number(url[2])){

          if (name!==undefined){
            songs[url[2]].name=name;
          }

          if(lyrics!==undefined){
            songs[url[2]].lyrics=lyrics;
          }

          if(trackNumber!==undefined){
            songs[url[2]].trackNumber=trackNumber;
          }

          const editedSong = {
            songId: Number(url[2]),
            name: name,
            trackNumber: trackNumber,
            albumId:song.albumId,
            lyrics: lyrics
          }

          res.statusCode=200;
          res.setHeader ("Content-Type","application/json");
          res.write(JSON.stringify(editedSong));
          return res.end();
        }
        else if((song.songId===Object.values(songs)[Object.values(songs).length-1].songId)&&song.songId!==Number(url[2])){
          res.statusCode=404;
          res.setHeader ("Content-Type","application/json");
          res.write("Album not found");
          return res.end();
        }
      }
    }

    //17. Delete a specified song by songId
    //DELETE /songs/:songId
        if (req.method==='DELETE' && url.length===3 && url[1]==="songs"){

          for (let song of Object.values(songs)){
            if(song.songId===Number(url[2])){

              delete songs[url[2]];

              res.statusCode=200;
              res.setHeader ("Content-Type","application/json");
              res.write(JSON.stringify({Message:`Successfully deleted song: ${song.name}`}));
              return res.end();
            }
            else if((song.songId===Object.values(songs)[Object.values(songs).length-1].songId)&&song.songId!==Number(url[2])){
              res.statusCode=404;
              res.setHeader ("Content-Type","application/json");
              res.write("Song not found");
              return res.end();
            }
          }
        }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Server is listening on port', port));
