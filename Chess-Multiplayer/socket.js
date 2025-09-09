const {createServer} = require('http');
const { Server } = require('socket.io');  

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let totalPlayers = 0;
let players = {};
let waiting = {
    '10': [],
    '15': [],
    '20': []
};
let matches = {
    '10': [],
    '15': [],
    '20': []
};

function removeFromWaiting(socket) {
    for (let time in waiting) {
        const index = waiting[time].indexOf(socket.id);
        if (index !== -1) {
            waiting[time].splice(index, 1);
            break;
        }
    }
}              

function fireTotalPlayers(){
    io.emit('total-players', totalPlayers);
}

function fireMatches({ opponentId, socketId , time}) {
    players[socketId].emit('match-found', 'white', time);
    players[opponentId].emit('match-found', 'black', time); 
    

    players[socketId].on('Sync_state', (fen, turn) => {
        players[opponentId].emit('sync_state_server', fen, turn);
    });

    players[opponentId].on('Sync_state', (fen, turn) => {
        players[socketId].emit('sync_state_server', fen, turn);
    });

    players[socketId].on('game_over', (winner) => {
        players[opponentId].emit('game_over_server', winner);
    })
    players[opponentId].on('game_over', (winner) => {
        players[socketId].emit('game_over_server', winner);
    });
}


function handleplayrequest(socket, time) {
    if (waiting[time].length >= 1) {
        const opponentId = waiting[time].splice(0, 1)[0];
        matches[time].push([socket.id, opponentId]);
        fireMatches({opponentId, socketId: socket.id, time});
        return;
    }  
    if (!waiting[time].includes(socket.id)) {
        waiting[time].push(socket.id);
    }
    //console.log(waiting);
}

io.on('connection', (socket) => {
    totalPlayers++;
    players[socket.id] = socket;
    socket.on('time-selected', function (time) {
        handleplayrequest(socket, time);
    });
    fireTotalPlayers();

    socket.on('disconnect', () => {
        totalPlayers = Math.max(0, totalPlayers - 1);
        delete players[socket.id];
        removeFromWaiting(socket);
        fireTotalPlayers();
    });
});

httpServer.listen(3000, () => {
    console.log('listening to port 3000');
});