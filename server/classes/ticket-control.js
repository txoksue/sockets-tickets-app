const fs = require('fs');


class Ticket {

    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}


class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];

        let data = require('../data/data.json');

        if (this.today === data.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            this.resetCount();
        }


    }

    nextTicket() {
        this.lastTicket++;

        let ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);

        this.writeFileData();
        return `Ticket ${this.lastTicket}`;
    }

    getLastTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    getLastFourTickets() {
        return this.lastFourTickets;
    }


    resetCount() {
        this.lastTicket = 0;
        this.tickets = [];
        this.writeFileData();
    }

    attendTicket(desk) {

        if (this.tickets.length === 0) {
            return {
                message: 'No hay tickets'
            }
        }

        let numberTicket = this.tickets[0].number;

        this.tickets.shift(); //Elimina la primera posicion del array

        let attendTicket = new Ticket(numberTicket, desk);

        this.lastFourTickets.unshift(attendTicket); //Lo añade al inicio del array.

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1) //Borra el último elemento del array.
        }

        this.writeFileData();

        return attendTicket;
    }

    writeFileData() {

        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}

module.exports = {
    TicketControl,
}