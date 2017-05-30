var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var schemas = require('../comic');

mongoose.connect('mongodb://localhost/comics');

var db = mongoose.connection;
var series = schemas.series;



router.get('/', function (req, res, next){
  data = [];
  series.find(function (err, series){
    if (series)
      {
        series.forEach(function (element){
          data.push(element.title);
          })
        }
      res.render('comic', {"files":data});
    });
  
  // data = fs.readdirSync("./comics")
  //   .filter(file => fs.lstatSync(path.join("./comics", file))
  //           .isDirectory())


});
module.exports = router;
