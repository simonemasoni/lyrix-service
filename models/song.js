let mongoose = require('mongoose')

let songSchema = new mongoose.Schema({
  title: String,
  author: String,
  lyrics: String
})

module.exports = mongoose.model('Song', songSchema)