var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblDesk1 = $('#lblEscritorio1');

var lblTicket2 = $('#lblTicket2');
var lblDesk2 = $('#lblEscritorio2');

var lblTicket3 = $('#lblTicket3');
var lblDesk3 = $('#lblEscritorio3');

var lblTicket4 = $('#lblTicket4');
var lblDesk4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('connect', function() {
    console.log('Conectado al servidor.');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor.');
});

socket.on('currentStatus', function(data) {
    updateHTML(data.lastFourTickets);
})

socket.on('lastFourTickets', function(data) {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    updateHTML(data.lastFourTickets);
})

function updateHTML(lastFourTickets) {

    for (var i = 0; i < lastFourTickets.length; i++) {

        lblTickets[i].text('Ticket ' + lastFourTickets[i].number);
        lblDesks[i].text('Escritorio ' + lastFourTickets[i].desk);
    }


}