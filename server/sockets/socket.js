const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');


const ticketControl = new TicketControl();
io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        console.log(next);
        callback(next);
    })

    client.emit('currentStatus', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFout()
    })

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);
        callback(attendTicket);
        client.broadcast.emit('lastFour', {
            lastFour: ticketControl.getLastFout()
        });
    });
});