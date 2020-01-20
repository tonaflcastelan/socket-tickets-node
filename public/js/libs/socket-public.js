// Establer conexión

var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');


var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('currentStatus', function(response) {
    updateHtml(response.lastFour)
});

socket.on('lastFour', function(response) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHtml(response.lastFour)
});

function updateHtml(lastFour) {
    for (var i = 0; i <= lastFour.length -1; i++) {
        lblTickets[i].text('Ticket ' + lastFour[i].number);
        lblDesks[i].text('Escritorio ' + lastFour[i].desk);
    }
}