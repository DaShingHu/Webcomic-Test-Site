var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var mongoose = require('mongoose');
var schemas = require('../comic');

mongoose.connect('mongodb://localhost/comics');

var db = mongoose.connection;
var pages = schemas.page;



router.get('/', function (req, res, next){
  var path = req._parsedOriginalUrl.path.substring(1).split("/");
  
  pages.find({'series': path[0], 'chapter': path[1]}, 
             function (err, pages)
             {
               if (pages.length == 0){
                 res.send("Sorry, nothing here!");
                 res.end()
               }

               fs.readFile(
                 __dirname + "/../comics/" + path[0] + "/" + path[1] + "/" + pages[0].title,
                 function (err, data){
                   if (data)
                   {
                     res.render('view_comic', {
                       'title' : path[0],
                       'path': data.toString('base64')
                     });
                   }
                 });
             });
});

module.exports = router;
