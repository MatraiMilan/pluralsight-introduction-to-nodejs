const http = require('http');
const localhost = '127.0.0.1';
const port = 1234;

http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!\n');
    })
    .listen(port, localhost);

console.log(`server is running at: http://${localhost}:${port}`);
