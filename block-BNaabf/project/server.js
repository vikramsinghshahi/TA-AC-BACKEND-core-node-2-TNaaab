var http = require('http');

var qs = require('querystring');
var fs = require('fs');
const { sensitiveHeaders } = require('http2');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('content-type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }
    if (req.method === 'POST' && req.url === '/form') {
      var parseData = qs.parse(store);
      res.setHeader('content-type', 'text/html');
      res.write(`<h2>${parseData.name}</h2>`);
      res.write(`<h3>${parseData.email}</h3>`);
      res.write(`<h4>${parseData.age}</h4>`);
      res.end();
    }
  });
}

server.listen(3000, () => console.log('server is listening at 5678'));
