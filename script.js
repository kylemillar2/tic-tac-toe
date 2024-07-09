class GameController {
    constructor(playerX, playerO) {
        this.playRound = this.playRound.bind(this);

        this.players = new Map();
        this.players.set("X", playerX);
        this.players.set("O", playerO);

        let squares = [...(document.querySelectorAll(".square"))];
        this.board = [];
        while(squares.length > 0) {
            this.board.push(squares.splice(0,3));
        }
        this.currentPlayer = "X";
        document.querySelector("#current-player").textContent = `${this.players.get(this.currentPlayer)}'s turn`;
    }
    
    playRound(event) {
        event.target.textContent = this.currentPlayer;
        this.checkWins();
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
        document.querySelector("#current-player").textContent = `${this.players.get(this.currentPlayer)}'s turn`;
    }

    checkWins() {
        const rows = this.board.length;
        const cols = this.board[0].length;

        // check rows
        for (let row = 0; row < rows; row++) {
            const cur = this.board[row][0].textContent;
            if (cur != "X" && cur != "O") {
                break;
            }

            let inARow = 0;
            for (let col = 0; col < cols; col++) {
                if (this.board[row][col].textContent != cur) {
                    break;
                }
                inARow++;
            }

            if (inARow == cols) {
                this.endGame();
                return;
            }
        }

        // check columns
        for (let col = 0; col < cols; col++) {
            const cur = this.board[0][col].textContent;
            if (cur != "X" && cur != "O") {
                break;
            }

            let inARow = 0;
            for (let row = 0; row < rows; row++) {
                if (this.board[row][col].textContent != cur) {
                    break;
                }
                inARow++;
            }

            if (inARow == rows) {
                this.endGame();
                return;
            }
        }

        // check diagonals
        let cur = this.board[0][0].textContent;
        let inARow = 0;
        if (cur == "X" || cur == "O") {
            for (let i = 0; i < rows; i++) {
                if (this.board[i][i].textContent != cur) {
                    break;
                }
                inARow++;
            }

            if (inARow == rows) {
                this.endGame();
                return;
            }
        }

        cur = this.board[rows - 1][0].textContent;
        inARow = 0;
        if (cur == "X" || cur == "O") {
            for (let i = rows - 1; i >= 0; i--) {
                if (this.board[i][i].textContent != cur) {
                    break;
                }
                inARow++;
                if (inARow == rows) {
                    this.endGame();
                    return;
                }
            }
        }

        this.changePlayer();
    }

    endGame() {
        document.querySelector("#winner").textContent = `${this.players.get(this.currentPlayer)} wins`;
        document.querySelector("#current-player").textContent = "";
        document.querySelectorAll(".square").forEach((square) => {
            square.removeEventListener("click", this.playRound);
        });
    }
}

let startGame = () => {
    const playerX = document.querySelector("#player-x");
    const playerO = document.querySelector("#player-o");
    
    if (!playerX.value || !playerO.value) {
        return;
    }

    const game = new GameController(playerX.value, playerO.value);
    playerX.disabled = true;
    playerO.disabled = true;
    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("click", game.playRound, { once: true }
        );
    });
}

let resetGame = () => {
    document.querySelectorAll(".square").forEach((square) => {
        square.textContent = "";
        square.removeEventListener("click", this.playRound);
    });
    const playerX = document.querySelector("#player-x");
    const playerO = document.querySelector("#player-o");
    playerX.value = "";
    playerO.value = "";
    playerX.disabled = false;
    playerO.disabled = false;
    document.querySelector("#winner").textContent = "";
    document.querySelector("#current-player").textContent = "";
}

const startButton = document.querySelector("#start-btn");
startButton.addEventListener("click", startGame);

const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", resetGame);