var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server.');
});

socket.on('message', function(message){
    console.log('New message: ' + message.text);
    var newMessage = '<p>' + message.text + '</p>';
    $('.messages').append(newMessage);
});

// Code for submitting new messages

var $form = $('#message-form');

$form.on('submit', function(e){
    var $message = $form.find('input[name=message]')
    e.preventDefault();

    socket.emit('message', {
        text: $message.val()
    });
    $message.val('');
});