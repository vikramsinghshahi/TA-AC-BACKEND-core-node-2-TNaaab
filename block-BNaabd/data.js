var http = require('http');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  req.on();
}

server.listen(7000, () => console.log('server is listening on 3000'));
