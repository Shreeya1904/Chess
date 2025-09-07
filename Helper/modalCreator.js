import * as piece from "../Data/pieces.js";

class ModalCreator {
  constructor(body) {
    if (!body) {
      throw new Error("Please pass the body");
    }

    this.open = false;
    this.body = body;
  }

  show() {
    this.open = true;
    document.body.appendChild(this.body);
    document.getElementById("root").classList.add("blur");
  }

  hide() {
    this.open = false;
    document.body.removeChild(this.body);
    document.getElementById("root").classList.remove("blur");
  }
}

function pawnPromotion(color, callback, id) {
  const rook = document.createElement("img");
  rook.onclick = rookCallback;
  rook.src = `../Assets/images/pieces/${color}/rook.png`;

  const knight = document.createElement("img");
  knight.onclick = knightCallback;
  knight.src = `../Assets/images/pieces/${color}/knight.png`;

  const bishop = document.createElement("img");
  bishop.onclick = bishopCallback;
  bishop.src = `../Assets/images/pieces/${color}/bishop.png`;

  const queen = document.createElement("img");
  queen.onclick = queenCallback;
  queen.src = `../Assets/images/pieces/${color}/queen.png`;

  const imageContainer = document.createElement("div");
  imageContainer.appendChild(rook);
  imageContainer.appendChild(knight);
  imageContainer.appendChild(bishop);
  imageContainer.appendChild(queen);

  const msg = document.createElement("p");
  msg.textContent = "Pawn Promotion! Choose a piece";

  const finalContainer = document.createElement("div");
  finalContainer.appendChild(msg);
  finalContainer.appendChild(imageContainer);
  finalContainer.classList.add("modal");

  const modal = new ModalCreator(finalContainer);
  modal.show();

  function rookCallback() {
    if (color == "white") {
      callback(piece.whiteRook, id);
    } else {
      callback(piece.blackRook, id);
    }
    modal.hide();
  }

  function knightCallback() {
    if (color == "white") {
      callback(piece.whiteKnight, id);
    } else {
      callback(piece.blackKnight, id);
    }
    modal.hide();
  }

  function bishopCallback() {
    if (color == "white") {
      callback(piece.whiteBishop, id);
    } else {
      callback(piece.blackBishop, id);
    }
    modal.hide();
  }

  function queenCallback() {
    if (color == "white") {
      callback(piece.whiteQueen, id);
    } else {
      callback(piece.blackQueen, id);
    }
    modal.hide();
  }
}

function showGameEndModal(message) {
  const msg = document.createElement("p");
  msg.textContent = message;

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Game";
  restartBtn.className = "restart-btn";
  restartBtn.onclick = () => {
    modal.hide();
    window.location.reload();
  };
 
  const container = document.createElement("div");
  container.appendChild(msg);
  container.appendChild(restartBtn);
  container.classList.add("modal");

  const modal = new ModalCreator(container);
  modal.show();
}

export default {pawnPromotion, showGameEndModal};
