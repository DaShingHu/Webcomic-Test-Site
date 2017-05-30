var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var schemas = require('../comic');

mongoose.connect('mongodb://localhost/comics');

var db = mongoose.connection;
var chapters = schemas.chapter;



router.get('/', function (req, res, next){
  var path = req._parsedOriginalUrl.path.substring(1);
  data = [];
  paths = [];
  chapters.find({'series': path},
                function (err, chapters){
                  chapters.forEach(function (element){
                    paths.push(path + "/" + element.title);
                    data.push(element.title);
                  });
                  res.render('chapter_selection', {"title": "Test", "paths":paths, "names": data});
    });
  
  // data = fs.readdirSync("./comics")
  //   .filter(file => fs.lstatSync(path.join("./comics", file))
  //           .isDirectory())


});
module.exports = router;
