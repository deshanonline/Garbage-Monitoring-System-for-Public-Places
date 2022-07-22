app.use(cors());
app.use(cors());
app.set('port', 3001);

var server = http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Socket connected");
	
	socket.on('POWER_BUTTON', function (data) {
		console.log("POWER_BUTTON  DATA ", data);		
	});

	socket.on('START_BUTTON', function (data) {
		console.log("START BUTTON  DATA ", data);
		jsonOut = JSON.parse(data);
		
	});

	

	setInterval(function () {
		sendUIDFVData();
		
	}, 1000);

});

	function sendUIDFVData(){
		var jsnObjHeartBeatTemp = 0;		
		io.sockets.emit("UI_DATA", JSON.stringify(jsnObjHeartBeatTemp));
	}
	
