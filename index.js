var http = require('http');
var express = require("express");
var cors = require("cors");

var app = express();
var server = http.createServer(app);

var io = require('socket.io').listen(server);

var bodyParser = require("body-parser");
var database = require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 5000;

let SongModel = require("./models/song");

var router = express.Router();
router.get("/song", (req, res) => {
  SongModel.find({}, "title author durationInSeconds")
    .sort({ title: 1 })
    .then((docs) => res.json(docs));
});

router.get("/song/:songId", (req, res) => {
  var songId = req.params.songId;
  SongModel.findById(songId).then((doc) => res.json(doc));
});

router.put("/song/:songId", (req, res) => {
  var songId = req.params.songId;
  const song = req.body;
  delete song._id;  
  SongModel.findByIdAndUpdate(songId, song).then(() =>
    res.json({})
  );
});

router.post("/song", (req, res) => {
  SongModel.create({
    title: req.body.title,
    author: req.body.author,
    lyrics: req.body.lyrics,
  }).then((doc) => res.json(doc));
});

app.use("/1", router);

app.use("/", express.static(__dirname + "/public/ui"));

//app.listen(port);

server.listen(port);
console.log("Server listening on port: " + port);


// Handle connection
io.on('connection', function (socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on('goToSong', function (data) {
      console.log(`Received message to go to song ${data}`);
      socket.broadcast.emit('navigateToSong', data);
  });
});