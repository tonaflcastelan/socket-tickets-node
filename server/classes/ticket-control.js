const fs = require('fs');

class Ticket
{
    constructor(number, desk)
    {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl
{
    /**
     * Init
     */
    constructor()
    {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];
        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCounter();
        }
    }

    /**
     * Reinicia conteno
     */
    resetCounter()
    {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveFile();
    }

    /**
     * Incrementar ticker
     */
    nextTicket()
    {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    /**
     * 
     */
    getLastTicket()
    {
        return `Ticket ${this.last}`;
    }

    /**
     * 
     */
    getLastFout()
    {
        return this.lastFour;
    }

    /**
     *
     */
    attendTicket(desk)
    {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attTicket = new Ticket(ticketNumber, desk);
        this.lastFour.unshift(attTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1); // delete last item
        }
        this.saveFile()
        return attTicket;
    }

    /**
     * Guardar en archivo
     */
    saveFile()
    {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}