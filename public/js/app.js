var socket = io();
var now = moment();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' has joined the room ' + room + '!');
$('#chat').text('You are in room: ' + room);

socket.on('connect', function(){
    var timeStamp = Date.now();
    var timestampMoment = moment.utc(timeStamp);
    var currentTime = timestampMoment.local().format("h:mm a");
    console.log('Connected to socket.io server at: ' + currentTime);
    socket.emit('joinRoom', {
        name: name,
        room: room 
    });
    // $('#chat').append('You are in room: ' + room);
    // message.room = room;
    // console.log(name + ' has joined the room ' + room + '!');
});

socket.on('message', function(message){
    console.log(message.time + ' New message: ' + message.text);
    var nameAndTime =  '<strong>' + message.name + " - " + message.time + '</strong>';
    var newMessages = '<li class=" list-group-item">' + nameAndTime + ": " + message.text + '</li>';
    // $('#chat').append('You are in room: ' + room);
    // console.log(room);
    $('.messages').append(newMessages);
});

// Code for submitting new messages

var $form = $('#message-form');

$form.on('submit', function(e){
    var timeStamp = Date.now();
    var timestampMoment = moment.utc(timeStamp);
    var currentTime = timestampMoment.local().format("h:mm a");
    var $message = $form.find('input[name=message]')
    e.preventDefault();

    socket.emit('message', {
        name: name,
        // room: room,
        text: $message.val(),
        time: currentTime
    });
    $message.val('');
});