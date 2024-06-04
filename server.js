const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.end('网站正在建设中2!\n');
});

server.listen(port, hostname, () => {
  console.log('Server running at http://1.12.237.206/');
});
