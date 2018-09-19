const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('currentStatus', {
        currentTicket: ticketControl.getLastTicket(),
        lastFourTickets: ticketControl.getLastFourTickets()
    })

    client.on('nextTicket', (data, callback) => {
        callback(ticketControl.nextTicket());
    })

    client.on('attendTicket', (data, callback) => {

        if (!data) {
            return {
                error: true,
                message: 'El escritorio es obligatorio'
            }
        }

        let attTicket = ticketControl.attendTicket(data);

        callback(attTicket);

        client.broadcast.emit('lastFourTickets', {
            lastFourTickets: ticketControl.getLastFourTickets()
        })

    })

});