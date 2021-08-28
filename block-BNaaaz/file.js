var http = require('http');
var fs = require('fs');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  res.setHeader('content-Type', 'text/plain');
  fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000, () => console.log('server is listening on 3000'));
