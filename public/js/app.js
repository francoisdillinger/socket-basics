var socket = io();
// var now = moment();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var count;

function getTime() {
    var timeStamp = Date.now();
    var timestampMoment = moment.utc(timeStamp);
    var currentTime = timestampMoment.local().format("h:mm a");
    return currentTime;
}

console.log(name + ' has joined the room ' + room + '!');
$('#chat').text('You are in room: ' + room);

socket.on('connect', function(){
    console.log('Connected to socket.io server at: ' + getTime());
    socket.emit('joinRoom', {
        name: name,
        room: room 
    });
});

socket.on('message', function(message){

    count = $('.messages').height();
    $('.scrollable-content').animate({ scrollTop: count });
    // console.log(message.time + ' New message: ' + message.text);
    var nameAndTime =  '<strong>' + message.name + " - " + message.time + '</strong>';
    var newMessages = '<li class="message list-group-item"><p>' + nameAndTime + ": " + message.text + '</p></li>';

    $('.messages').append(newMessages);
    
});

// Code for submitting new messages

var $form = $('#message-form');

$form.on('submit', function(e){
    var $message = $form.find('input[name=message]')
    e.preventDefault();

    socket.emit('message', {
        name: name,
        text: $message.val(),
        time: getTime()
    });
    $message.val('');
});