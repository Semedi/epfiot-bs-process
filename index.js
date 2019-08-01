var bsServer = require('lwm2m-bs-server');

var net = require('net');

var server = net.createServer();
server.on('connection', function(socket) {
    console.log('A new connection has been established.');
    socket.write('This is epfiot lw2mw test server!');
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);







    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});


bsServer.on('ready', function () {
    bsServer.configure('coap-node-test', [{
        serverURI: 'coap://leshan.eclipse.org:5683'
    }]);

});

bsServer.on('bootstrapped', function () {
    console.log('bootstrapped');
});

bsServer.on('error', function (err) {
    console.log(err);
});


bsServer.start(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('>> lwm2m bootstrap server start!');
    }
});

server.listen(1337, '127.0.0.1');
