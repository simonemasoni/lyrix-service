let mongoose = require('mongoose')

let songSchema = new mongoose.Schema({
  title: String,
  author: String,
  lyrics: String,
  durationInSeconds: Number
})

module.exports = mongoose.model('Song', songSchema)