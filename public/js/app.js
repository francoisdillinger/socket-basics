var socket = io();
var now = moment();


socket.on('connect', function(){
    var timeStamp = Date.now();
    var timestampMoment = moment.utc(timeStamp);
    var currentTime = timestampMoment.local().format("h:mm a");
    console.log('Connected to socket.io server at: ' + currentTime);
});

socket.on('message', function(message){
    console.log(message.time + ' New message: ' + message.text);
    var newMessage = '<p>' + message.time + ' ' + message.text + '</p>';
    $('.messages').append(newMessage);
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
        text: $message.val(),
        time: currentTime
    });
    $message.val('');
});