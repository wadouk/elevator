var elevator = require('./elevator.js');
var server = function() {

    var start = function(port) {
        var express = require('express');
        var app = express();

        elevator.reset();
        app.configure(function() {
            app.use(app.router);
            app.use(express.static( __dirname+'/../www/'));
        });
        app.configure('production', function() {
            app.use(express.cache(1000 * 60 * 60));
        });
        function test(req, res) {
            console.log('Serving ' + req.url);
            res.setHeader('content-type', 'application/json');
            res.send(elevator);
        }
        function reset(req, res) {
            if (req && req.query && req.query.cause) {
                console.log('reset',req.query.cause);
            }
            elevator.reset();
            res.send('');
        }
        function nextCommand(req, res) {
            var way = elevator.nextCommand();
            res.send(way);
            console.log('Serving ' + req.url,'way',way);
        }
        function call(req, res) {
            console.log('Serving ' + req.url);
            elevator.call({atFloor:req.query.atFloor,to:req.query.to})
            res.send('');
        }
        function go(req, res) {
            elevator.go({floorToGo:req.query.floorToGo})
            console.log('Serving ' + req.url);
            res.send('');
        }
        function entered(req, res) {
            console.log('Serving ' + req.url);
            res.send('');
        }
        function exited(req, res) {
            console.log('Serving ' + req.url);
            res.send('');
        }
        app.get('/api/test', test);
        app.get('/reset', reset);
        app.get('/nextCommand', nextCommand);
        app.get('/call', call);
        app.get('/go', go);
        app.get('/userHasEntered', entered);
        app.get('/userHasExited', exited);
        app.listen(port);
        console.log('Server listening on '+port);
    };

    return {
        'start': start,
        'dummy': function() {
            return 'hello';
        }
    };
};
module.exports = server();