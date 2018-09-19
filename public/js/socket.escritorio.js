var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor.');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor.');
});

//Recoge los parametros de la url
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio.')
}

var desk = searchParams.get('escritorio');

$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {

    socket.emit('attendTicket', desk, function(resp) {

        if (resp.message) {
            $('small').text(resp.message);
        } else {
            $('small').text(resp.number);
        }
    })
});