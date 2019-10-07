var express    = require('express');
var cors = require('cors');

var app        = express();
var bodyParser = require('body-parser');

var database = require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.configure(function() {
  app.use('/ui', express.static(__dirname + '/public/ui'));
});

var port = process.env.PORT || 5000;

let SongModel = require('./models/song');

var router = express.Router(); 
router.get('/song', (req, res) => {
  SongModel.find().sort({title: 1}).then(docs => res.json(docs));
});

router.get('/song/:songId', (req, res) => {
  var songId = req.params.songId;
  SongModel.findById(songId).then(doc => res.json(doc));
});

app.use('/1', router);

app.listen(port);
console.log('Server listening on port: ' + port);

