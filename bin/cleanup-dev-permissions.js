var fs = require('fs')

var fileName = './src/modules/permissions.js';

fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/DEV: "DEV",/g, '');

  fs.writeFile(fileName, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
