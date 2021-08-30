var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store = store + chunk;
  });
  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/json') {
      res.setHeader('Content-Type', 'application/json');
      res.end(store);
    }

    if (req.method === 'POST' && req.url === '/form') {
      var formData = qs.parse(store);

      res.end(JSON.stringify(formData));
      console.log(formData);
    }
  });
}

server.listen(7000, () => console.log('server is listening on 3000'));
