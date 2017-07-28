var jq = require('jquery');
var archive = require('../helpers/archive-helpers');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

/* from Learn:
This workers node app will read the list of URLs from [archives/sites.text] and fetch the pages specified by those URLs from the internet, saving each web page into a file on your computer.

Configure this second app to run on a schedule using cron.


*/

fs.writeFile(archive.paths.cron, 'htmlFetcher ran! \n', {flag: 'a'}, (err) => {
  if (err) { throw err; }
  console.log('The file has been saved');
});
