var app = require('express')();
var http = require('http');
var https = require('https');


var fs = require('fs');

var options = {
	key: fs.readFileSync('certificates/key.pem'),
	cert: fs.readFileSync('certificates/certificate.pem')
};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



httpsServer = https.createServer(options, app);
httpServer = http.createServer(app);

// Double listen this is the answer .....
var io = require('socket.io').listen(httpsServer).listen(httpServer);
httpsServer.listen(443);
httpServer.listen(80);

io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
});

