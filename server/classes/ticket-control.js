const fs = require('fs');

class TicketControl {

    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();

        let data = require('../data/data.json');

        if (this.today === data.today) {
            this.lastTicket = data.lastTicket;
        } else {
            this.resetCount();
        }


    }

    nextTicket() {
        this.lastTicket++;
        this.writeFileData();
        return `Ticket ${this.lastTicket}`;
    }

    resetCount() {
        this.lastTicket = 0;
        this.writeFileData();
    }

    writeFileData() {

        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}

module.exports = {
    TicketControl
}