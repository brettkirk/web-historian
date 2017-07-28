var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html'),
  list: path.join(__dirname, '../archives/sites.txt'),
  cron: path.join(__dirname, '../archives/cronLog.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var listData = '';
  fs.readFile(this.paths.list, (err, data) => {
    if (err) {
      console.log('oops');
    } else {
      listData += data.toString();
      listData = listData.split('\n');
      callback(listData);
      return listData;
      //result.push(listData);
    }
  });
 // return result[0];
};

exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function (data) {
    if (data.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  //var contents = fs.read
  fs.writeFile(this.paths.list, url + '\n', {flag: 'a'}, (err) => {
    if (err) { throw err; }
    console.log('The file has been saved');
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('oops');
    } else {
      if (files.includes(url)) { 
        callback(true);
      } else {
        callback(false);
      }
    }
  });
};

/*exports.isUrlArchivedReturn = function(url) {
  console.log('readdir: ', fs.readdir(this.paths.archivedSites, (err, files) => {
    if (err) {
      console.log('oops');
    } else {
      return files.includes(url);
    }
  }));
};*/

exports.downloadUrls = function(urls) {
  _.each(urls, url => fs.writeFile(this.paths.archivedSites + '/' + url, '$$$$$', {flag: 'a'}, (err) => {
    if (err) { throw err; }
    console.log('The url has been downloaded!');
  }));
};
