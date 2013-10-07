var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
});

exports.listen = function () {
    server.listen.apply(server,arguments);
};

exports.close = function (callback) {
    server.close(callback);
};
