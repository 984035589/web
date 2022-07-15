// 代理浏览器的请求，转发给server

const http = require('http');

const options = {
  port: 1234,
  path: '/',
  method: 'POST',
};

const server = http.createServer((request, response) => {
  const req = http.request(options, (res) => {
    const arr = [];
    res.on('data', (buf) => {
      arr.push(buf);
    });
    res.on('end', () => {
      console.log(Buffer.concat(arr).toString());
      response.setHeader('Content-type', 'text/html;charset=utf-8');
      response.setHeader('Set-cookie', 'hello');
      response.end(Buffer.concat(arr).toString());
    });
  });
  req.end('山有木兮');
});

server.listen(2345);
