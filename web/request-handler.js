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
      //console.log('return: ', archive.isUrlArchivedReturn(url));
      // var doesExist = false;
      // archive.isUrlArchived(url, function(exists) {
      //   console.log('doesExist (in func before): ', doesExist);
      //   doesExist = exists;
      //   console.log('doesExist (in func after): ', exists);
      // });
      // console.log('doesExist: ', doesExist);
      // req.url = '/www.google.com'
      fs.readFile(archive.paths.archivedSites + req.url, dataCallback);
    }
    
    var callback = function (a) { console.log(a); };
    archive.readListOfUrls(callback);
  //} else if (req.method === 'GET' && req.url === '/' + ) {
    
  } else {
    res.end('');
  }
  
};
