var path = require('path');
// console.log(__filename);

// console.log(__dirname);

// console.log(__dirname + '/index.html');

// console.log('./index.html');

// console.log(path.join(__dirname, '/index.html'));

// var http = require('http');
// var qs = require('querystring');

// var server = http.createServer(handleServer);

// function handleServer(req, res) {
//   if (req.method === 'POST' && req.url === '/') {
//     var store = '';
//     req.on('data', (chunk) => {
//       store = store + chunk;
//     });

//     req.on('end', () => {
//       res.statusCode = 201;
//       console.log(store);
//       var parseData = qs.parse(store);
//       console.log(parseData);
//       res.end(JSON.stringify(parseData));
//     });
//   }
// }
// server.listen(3000, () => console.log('server is listening at 3000'));

var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleServer);

function handleServer(req, res) {
  console.log(req.headers['content-type']);

  var store = '';

  req.on('data', (chunk) => {
    store = store + chunk;
  });

  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      var parseData = qs.parse(store);
      res.end(JSON.stringify(parseData));
    }

    if (req.headers['content-type'] === 'application/json') {
      var jasonData = JSON.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${jasonData.name}</h2> <p>${jasonData.email}</p`);
    }
  });
}
server.listen(3000, () => console.log('server is listening at 3000'));
