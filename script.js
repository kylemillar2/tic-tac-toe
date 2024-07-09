class GameController {
    constructor() {
        this.playRound = this.playRound.bind(this);

        let squares = [...(document.querySelectorAll(".square"))];
        this.board = [];
        while(squares.length > 0) {
            this.board.push(squares.splice(0,3));
        }
        console.log(this.board);
        this.currentPlayer = "X";
    }
    
    playRound(event) {
        console.log(this);
        event.target.textContent = this.currentPlayer;
        this.checkWins();
        this.changePlayer();
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
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
                console.log(inARow);
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
    }

    endGame() {
        console.log(`${this.currentPlayer} won`);
        document.querySelectorAll(".square").forEach((square) => {
            square.removeEventListener("click", this.playRound);
        });
    }
}

function startGame() {
    const game = new GameController();

    document.querySelectorAll(".square").forEach((square) => {
        square.addEventListener("click", game.playRound, { once: true }
        );
    });
}

startGame();