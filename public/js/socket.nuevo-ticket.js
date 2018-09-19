//Comando que establece la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor.');
});

socket.on('currentStatus', function(data) {
    label.text(data.currentTicket);
})

socket.on('disconnect', function() {
    console.log('Desconectado al servidor.');
});

$('button').on('click', function() {

    socket.emit('nextTicket', null, function(nextTicket) {
        console.log(nextTicket);
        label.text(nextTicket);
    })
});