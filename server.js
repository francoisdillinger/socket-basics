var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();
var clientInfo = {};


app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    var timeStamp = Date.now();
    var timestampMoment = moment.utc(timeStamp);
    var currentTime = timestampMoment.local().format("h:mm a");

    console.log('User connected via socket.io at: ' + currentTime);

    socket.on('joinRoom', function(req){
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'Skynet',
            text: req.name + ' has joined!',
            time: currentTime
        });
    });

    socket.on('message', function(message){
        // console.log('hi');
        console.log( message.time + ' Message recieved: ' + message.text);

        // message.time = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    socket.emit('message', {
        name: 'Skynet',
        text: 'Welcome to the app bruh!',
        time: currentTime
    });
});

http.listen(PORT, function(){
    console.log('Server Started.');
});