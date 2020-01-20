// Establer conexión

var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');
if(!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('escritorio')

$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', {desk: desk}, function(response) {
        if (response == 'No hay tickets') {
            label.text(response)
            return;
        }
        label.text('Ticket ' + response.number);
    });
})