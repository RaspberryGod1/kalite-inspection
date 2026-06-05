const http = require('http');
const fs = require('fs');
const path = require('path');
const base = __dirname;
const MIME = {
  html: 'text/html; charset=utf-8',
  js: 'application/javascript',
  css: 'text/css',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  ico: 'image/x-icon'
};
http.createServer((req, res) => {
  const url = req.url === '/' ? 'index.html' : decodeURIComponent(req.url.slice(1));
  const file = path.join(base, url);
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + url); return; }
    const ext = path.extname(file).slice(1);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(4321, () => console.log('Serveur OK sur http://localhost:4321'));
