let mongoose = require('mongoose')

let songSchema = new mongoose.Schema({
  title: String,
  author: String
})

module.exports = mongoose.model('Song', songSchema)