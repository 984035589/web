const http = require('http');

const server = http.createServer((req, res) => {
  const arr = [];
  req.on('data', (chunk) => {
    arr.push(chunk);
  });

  req.on('end', () => {
    const str = Buffer.concat(arr).toString();
    console.log(str);
    res.end(Buffer.from(str + ' hahah'));
  });
});

server.listen(1234);
