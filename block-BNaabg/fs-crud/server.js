var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var url = require('url');
var server = http.createServer(handleServer);

var userPath = __dirname + '/users/';
function handleServer(req, res) {
  var parsedUrl = url.parse(req.url, true);
  // console.log(parsedUrl);

  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.url === '/users' && req.method === 'POST') {
      var username = JSON.parse(store).username;
      fs.open(userPath + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            res.end(`${username} created successfully`);
          });
        });
      });
    }
    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
      var username = parsedUrl.query.username;
      fs.readFile(userPath + username + '.json', (err, content) => {
        // console.log(err, content);
        if (err) return console.log('error');
        res.setHeader('content-type', 'text/html');
        res.end(content);
      });
    }
    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      var username = parsedUrl.query.username;
      fs.open(userPath + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              res.end(`${username} updated successfully`);
            });
          });
        });
      });
    }
    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      var username = parsedUrl.query.username;
      fs.unlink(userPath + username + '.json', (err) => {
        if (err) return console.log(err);
        res.end(`${username} is deleted`);
      });
    }
  });
}

server.listen(3000, () => console.log('server is listeining at 3K'));
