var http = require('http');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  req.on(data);

  req.on(end);
}

server.listen(3456, () => console.log('server is listenig on 3456'));
