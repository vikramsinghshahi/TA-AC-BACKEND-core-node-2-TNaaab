var http = require('http');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/') {
      res.end('end');
    }
  });
}
server.listen(3000, () => console.log('server is listening at 3000'));
