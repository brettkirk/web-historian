var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var indexData = '';
  
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(archive.paths.index, (err, data) => {
      if (err) {
        console.log('oops');
      } else {
        indexData += data.toString();
        res.end(indexData);
      }
    });
    var callback = function (a) { console.log(a); };
    archive.readListOfUrls(callback);
  } else {
    res.end('');
  }
  
};
