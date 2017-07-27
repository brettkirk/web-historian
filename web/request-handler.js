var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var indexData = '';
  //console.log(req);
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
