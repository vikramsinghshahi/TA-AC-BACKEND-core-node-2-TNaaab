var http = require('http');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  res.end('end');
}

server.listen(3000, () => console.log('server is listening on 3000'));
