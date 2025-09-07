import * as piece from "../Data/pieces.js";
import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";

const globalPiece = new Object();

// render global state highlights
function globalStateRender() {
  globalState.forEach((row) => {
    row.forEach((element) => {
      if (element.highlight) {
        const hightlightSpan = document.createElement("span");
        hightlightSpan.classList.add("highlight");
        document.getElementById(element.id).appendChild(hightlightSpan);
      } else {
        const el = document.getElementById(element.id);
        const highlights = Array.from(el.getElementsByTagName("span"));
        highlights.forEach((element) => {
          el.removeChild(element);
        });
      }
    });
  });
}


function selfHighlight(piece) {
  document
    .getElementById(piece.current_position)
    .classList.add("highlightYellow");
}

// use when you want to render pieces on board
function pieceRender(data) {
  data.forEach((row) => {
    row.forEach((square) => {
      // render piece if square has piece
      if (square.piece) {
        const squareEl = document.getElementById(square.id);

        // create piece
        const piece = document.createElement("img");
        piece.src = square.piece.img;
        piece.classList.add("piece");

        squareEl.appendChild(piece);
      }
    });
  });
}

// initialize game render
function initGameRender(data) {
  data.forEach((element) => {
    const rowEl = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // render black pawn
      if (square.id[1] == 7) {
        square.piece = piece.blackPawn(square.id);
        globalPiece.black_pawn = square.piece
      }

      // render black rook
      if (square.id == "h8" || square.id == "a8") {
        square.piece = piece.blackRook(square.id);
        if(globalPiece.black_rook_1) {
          globalPiece.black_rook_2 = square.piece
        } else {
          globalPiece.black_rook_1 = square.piece
        }
      }

      // render black knight
      if (square.id == "b8" || square.id == "g8") {
        square.piece = piece.blackKnight(square.id);
        if(globalPiece.black_knight_1) {
          globalPiece.black_knight_2 = square.piece
        } else {
          globalPiece.black_knight_1 = square.piece
        }
      }
      // render black Bishop
      if (square.id == "c8" || square.id == "f8") {
        square.piece = piece.blackBishop(square.id);
        if(globalPiece.black_bishop_1) {
          globalPiece.black_bishop_2 = square.piece
        } else {
          globalPiece.black_bishop_1 = square.piece
        }
      }
      // render black Queen
      if (square.id == "d8") {
        square.piece = piece.blackQueen(square.id);
        globalPiece.black_queen = square.piece
      }
      // render black King
      if (square.id == "e8") {
        square.piece = piece.blackKing(square.id);
        globalPiece.black_king = square.piece;
      }

      // render white pawn
      if (square.id[1] == 2) {
        square.piece = piece.whitePawn(square.id);
        globalPiece.white_pawn = square.piece
      }
      // render white queen
      if (square.id == "d1") {
        square.piece = piece.whiteQueen(square.id);
        globalPiece.white_queen = square.piece
      }

      // render white king
      if (square.id == "e1") {
        square.piece = piece.whiteKing(square.id);
        globalPiece.white_king = square.piece;
      }

      // render white rook
      if (square.id == "h1" || square.id == "a1") {
        square.piece = piece.whiteRook(square.id);
        if(globalPiece.white_rook_1) {
          globalPiece.white_rook_2 = square.piece
        } else {
          globalPiece.white_rook_1 = square.piece
        }
      }

      // render black knight
      if (square.id == "b1" || square.id == "g1") {
        square.piece = piece.whiteKnight(square.id);
        if(globalPiece.white_knight_1) {
          globalPiece.white_knight_2 = square.piece
        } else {
          globalPiece.white_knight_1 = square.piece
        }
      }

      // render black bishop
      if (square.id == "c1" || square.id == "f1") {
        square.piece = piece.whiteBishop(square.id);
        if(globalPiece.white_bishop_1) {
          globalPiece.white_bishop_2 = square.piece
        } else {
          globalPiece.white_bishop_1 = square.piece
        }
      }

      rowEl.appendChild(squareDiv);
    });
    rowEl.classList.add("squareRow");
    ROOT_DIV.appendChild(rowEl);
  });

  pieceRender(data);
}

// render highlight on a square(possible move)
function renderHighlight(squareId) {
  const hightlightSpan = document.createElement("span");
  hightlightSpan.classList.add("highlight");
  document.getElementById(squareId).appendChild(hightlightSpan);
}

// clear all highlights from the board
function clearHightlight() {
  const flatData = globalState.flat();

  flatData.forEach((el) => {
    if (el.captureHighlight) {
      document.getElementById(el.id).classList.remove("captureColor");
      el.captureHighlight = false;
    }

    if (el.highlight) {
      el.highlight = null;
    }

    globalStateRender();
  });
}

export {
  initGameRender,
  renderHighlight,
  clearHightlight,
  selfHighlight,
  globalStateRender,
  globalPiece
};
