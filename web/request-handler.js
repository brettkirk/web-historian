var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var indexData = '';
  var dataCallback = (err, data) => {
    if (err) {
      console.log('oops');
    } else {
      indexData += data.toString();
      res.end(indexData);
    }
  };
  
  
  
  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.index, dataCallback);
    } else {
      var url = req.url.slice(1);
      archive.isUrlArchived(url, function(exists) {
        if (exists === true) {
          fs.readFile(archive.paths.archivedSites + req.url, dataCallback);
        } else {
          res.writeHead(404, http.headers);
          res.end();
        }
      });
    }
    
    var callback = function (a) { console.log(a); };
    archive.readListOfUrls(callback);
  //} else if (req.method === 'GET' && req.url === '/' + ) {
    
  } else if (req.method === 'POST') {
    console.log(req.url);
    var url = '';
    req.on('data', (chunk) => {
      url += chunk.toString().slice(4);
      
      archive.isUrlInList(url, function(exists) {
        res.writeHead(302, http.headers);
        console.log('exists: ', exists);
        
        if (exists === false) {
          archive.addUrlToList(url, function() { console.log('list: ', archive.paths.list); });
          res.end();
        } else {
          res.end();
        }
      });
    });
  } else {
    res.end();
  }
  
};
