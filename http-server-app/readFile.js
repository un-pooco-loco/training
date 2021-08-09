const fs = require('fs');
// fs.readFile('welcome.txt', 'utf8', function(err, data) {
//     module.exports.message = data;
// });

var data = fs.readFileSync('welcome.txt', 'utf8');
module.exports.message = data;