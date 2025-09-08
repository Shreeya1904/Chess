var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
let cplayer = null;

function startTimer(seconds, container, oncomplete) {
    let startTime, timer, obj, ms = seconds*1000,
        display = document.getElementById(container);
    obj = {};
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,250); // adjust this number to affect granularity
                            // lower numbers are more accurate, but more CPU-expensive
    };
    obj.pause = function() {
        ms = obj.step();
        clearInterval(timer);
    };
    obj.step = function() {
        let now = Math.max(0,ms-(new Date().getTime()-startTime)),
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        display.innerHTML = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if( oncomplete) oncomplete();
        }
        return now;
    };
    obj.resume();
    return obj;
}


function onDragStart(source, piece, position, orientation) {
    if (game.turn() !== cplayer[0]) {
        return false;
    }
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'
  socket.emit('Sync_state', game.fen(), game.turn());
  updateStatus()
}

function onChange() {
  if (game.game_over()) {
  if (game.in_checkmate()) {
    const winner = game.turn() === 'w' ? 'Black' : 'White';
    console.log(winner);
    socket.emit('game_over', winner);
  } else if (game.in_draw()) {
    socket.emit('game_over', 'draw');
  }
  }
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}

function updateStatus () {
  var status = ''

  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}

var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onChange: onChange
}
board = Chessboard('board1', config);

updateStatus()

function handleButtonClick(event) {
  const time = event.target.getAttribute('data-time');
  socket.emit('time-selected', time);
  const buttons = document.getElementsByClassName('time');
  for (let btn of buttons) {
    btn.disabled = true;
  }
    document.querySelector('.root').style.display = 'none';
    document.getElementById('waiting').style.display = 'block';
    document.querySelector('#time-selection').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.getElementsByClassName('time')
  for (let index = 0; index < buttons.length; index++){
    buttons[index].addEventListener('click', handleButtonClick);
  }
});

const socket = io('http://localhost:3000');
console.log(socket);

socket.on('total-players', function(data) {
  document.getElementById('total_player').innerText = `Total Players: ${data}`;
});

socket.on('match-found', (color,time) => {
  cplayer = color;
  
  document.querySelector('.root').style.display = 'block';
  document.getElementById('waiting').style.display = 'none';
  const currentplayer = color === 'white' ? 'White' : 'Black';
  document.getElementById('player').style.display = 'block';
  document.getElementById('player').innerHTML =
    'You are playing as ' + currentplayer;
    game.reset();
    board.orientation(currentplayer.toLowerCase());
  board.start();

  var timer = startTimer(Number(time)*60, 'timerDisplay', function () {
    alert('Time is up! You lost the game.');
  });
  timer.pause();
  timer.resume();
    updateStatus();
});


socket.on('sync_state_server', function (fen, turn) {
    game.load(fen);
    game.setTurn(turn);
    board.position(fen);
    updateStatus();
});

socket.on('game_over_server', function (winner) {
  //console.log(winner);
  if (winner === 'draw') {
    alert("Game Over! It's a draw.");
  } else {
    alert(`Game Over! ${winner} wins.`);
  }
  //window.location.reload();
  game.reset();
  board.start();
  updateStatus();
});