var express = require("express");
var cors = require("cors");

var app = express();
var bodyParser = require("body-parser");

var database = require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 5000;

let SongModel = require("./models/song");

var router = express.Router();
router.get("/song", (req, res) => {
  SongModel.find({}, "title author")
    .sort({ title: 1 })
    .then((docs) => res.json(docs));
});

router.get("/song/:songId", (req, res) => {
  var songId = req.params.songId;
  SongModel.findById(songId).then((doc) => res.json(doc));
});

router.put("/song/:songId", (req, res) => {
  var songId = req.params.songId;
  SongModel.findByIdAndUpdate(songId, { lyrics: req.body.lyrics }).then(() =>
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

app.listen(port);
console.log("Server listening on port: " + port);
