var express    = require('express');

var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;

let connDb = {};


var router = express.Router(); 
router.get('/song', function(req, res) {
  
});

router.get('/song/:songId', function(req, res) {
  var songId = req.params.songId;

});


app.use('/1', router);

app.listen(port);
console.log('Server listening on port: ' + port);
