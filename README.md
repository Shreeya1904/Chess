
# Chess Game 🎯

**A fully interactive web-based chess game with real-time multiplayer support, built using JavaScript DOM and WebSocket.io.**

[Live Demo](#https://chess-multiplayer-xi.vercel.app/) 

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [How It Works](#how-it-works)
* [Contributing](#contributing)
* [License](#license)

---

## Overview

This project is a web-based chess game where players can:

* Play against each other in real-time.
* Choose different time controls and be matched automatically.
* Enjoy a fully interactive chessboard with dynamic rendering and intuitive drag-and-drop piece movement.

The game demonstrates **JavaScript DOM manipulation**, **WebSocket-based real-time communication**, and **session-based matchmaking logic**.

---

## Features

* **Dynamic Chessboard Rendering:**

  * Built using JavaScript DOM APIs.
  * Interactive highlighting of valid moves and captured pieces.
* **Real-Time Multiplayer:**

  * Peer-to-peer gameplay powered by **WebSocket.io**.
  * Ensures smooth and low-latency move synchronization.
* **Session-Based Matchmaking:**

  * Players select time controls (e.g., 5, 10, 15 minutes).
  * Automatic pairing of players waiting for a match.
* **Move Validation:**

  * Enforces all chess rules (legal moves, check/checkmate detection).
* **Game State Persistence:**

  * Maintains current board state and timer across sessions.

---

## Tech Stack

* **Frontend:**

  * JavaScript, HTML
  * DOM Manipulation for board and UI rendering
* **Backend:**
  
  * WebSocket.io for real-time communication
* **Data Handling:**

  * In-memory session management for matchmaking

---

## Screenshots

<img width="1914" height="967" alt="image" src="https://github.com/user-attachments/assets/eff419df-37c6-4592-aa04-6d6bd57affd8" />


---

## Installation

**Steps:**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/chess-game.git
   cd chess-game
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   npm start
   ```
4. Open the browser and navigate to:

   ```
   http://localhost:3000
   ```

---

## Usage

1. Open the game in a browser.
2. Choose a **time control** for your match.
3. Wait for an opponent to be paired automatically.
4. Play your game!
5. The game ends when one player wins, loses, or a draw is reached.

---

## How It Works

* **Frontend:**

  * Renders chessboard and pieces dynamically using the DOM.
  * Handles user interactions like drag-and-drop and move validation.
* **Backend:**

  * Manages WebSocket connections between players.
  * Maintains matchmaking queues and pairs players based on selected time controls.
  * Synchronizes moves in real-time to all connected clients.
* **Match Flow:**

  1. Player joins a session and selects time control.
  2. Server pairs the player with another waiting player.
  3. Players make moves; backend validates and broadcasts them.
  4. Game ends on checkmate, stalemate, or timeout.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```
3. Make your changes.
4. Commit your changes:

   ```bash
   git commit -m "Add new feature"
   ```
5. Push to the branch:

   ```bash
   git push origin feature-name
   ```
6. Open a Pull Request.

---

