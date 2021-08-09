const http = require('http');
const fs = require('fs');


var server = http.createServer(function(req, res) {
    console.log('Request was made: ', req.url);
    if (req.url === '/home' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1> Something went wrong! </h1>');
    }
});



server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000');