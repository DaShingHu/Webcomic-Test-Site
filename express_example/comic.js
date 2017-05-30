var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var series_schema = new Schema({
  path : String,
  title: String,
  author: String,
  about: String
});

var chapter_schema = new Schema({
  path: String,
  title: String,
  series: String,
  author: String,
  about: String
  });

var page_schema = new Schema({
  path: String,
  title: String,
  chapter: String,
  series: String,
  number: Number
});

var series = mongoose.model('series', series_schema);
var chapter = mongoose.model('chapter', chapter_schema);
var page = mongoose.model('page', page_schema);

module.exports = {
  series,
  chapter,
  page
};
