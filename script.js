const Gameboard = (() => {
    let board = []

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            let cell = Cell();
            cell.setRowIndex(i);
            cell.setColumnIndex(j);
            board[i].push(cell);
        }
    }

    const getBoard = () => board;
    const setBoard = (row, column, player) => {
        board[row][column].setValue(player);
    };
    const resetBoard = () => {
        board = []
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                let cell = Cell();
                cell.setRowIndex(i);
                cell.setColumnIndex(j);
                board[i].push(cell);
            }
        }
    }
    const printBoard = () => {
        const printOfBoard = board.map((row) =>
            row.map((cell) => cell.getValue()))
    } 
    const getWinner = () => {
        // Check row & column
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() == board[i][1].getValue() &&
                board[i][1].getValue() == board[i][2].getValue() &&
                board[i][0].getValue() != undefined ) {
                return board[i][0].getValue();
            }
            if (board[0][i].getValue() == board[1][i].getValue() &&
                board[1][i].getValue() == board[2][i].getValue() &&
                board[0][i].getValue() != undefined) {
                return board[0][i].getValue();
            }
        }
        // Check diagonal
        if (board[0][0].getValue() == board[1][1].getValue() &&
            board[1][1].getValue() == board[2][2].getValue() &&
            board[2][2].getValue() != undefined) {
            return board[1][1].getValue();
        };
        if (board[0][2].getValue() == board[1][1].getValue() &&
            board[1][1].getValue() == board[2][0].getValue() &&
            board[1][1].getValue() != undefined) {
            return board[1][1].getValue();
        };
        return false;
    }

    const checkWin = () => {
        if (getWinner()) {
            return true;
        };
        return false;
    }

    const checkEndOfGame = () => {
        if (checkWin()) {
            return true;
        };
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col].getValue() == undefined) {
                    return false;
                };
            };
        };
        return true;
    };

    return {getBoard, setBoard, resetBoard, printBoard, getWinner, checkWin, checkEndOfGame} 

})();

function Cell() {
    let value;
    let rowIndex;
    let columnIndex;

    const setValue = (player) => {
        value = player;
    };
    const getValue = () => {
        return value;
    };
    const setRowIndex = (index) => {
        rowIndex = index;
    };
    const getRowIndex = () => {
        return rowIndex;
    };
    const setColumnIndex = (index) => {
        columnIndex = index;
    };
    const getColumnIndex = () => {
        return columnIndex;
    };

    return {
        setValue,
        getValue,
        setRowIndex,
        getRowIndex,
        setColumnIndex,
        getColumnIndex,
    };
}

function screenController() {
    const game = Gameboard;
    const boardDiv = document.querySelector(".board");
    const resultDiv = document.querySelector(".result");
    const restartBtn = document.querySelector("#restartBtn");
    let player = "X";

    const switchPlayerTurn = () => {
        player == "X" ? player = "O" : player = "X";
    };

    const updateBoard = () => {
        boardDiv.textContent = "";
        game.getBoard().forEach(row => {row.forEach(cell => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = cell.getRowIndex();
            cellButton.dataset.column = cell.getColumnIndex();
            cellButton.textContent = cell.getValue();
            boardDiv.appendChild(cellButton);   
        })
        });
    }

    const displayResults = () => {
        if (game.getWinner()) {
            resultDiv.textContent = `${game.getWinner()} wins!`;
        } else if (game.checkEndOfGame()) {
            resultDiv.textContent = "Tie!";
        } else {
            resultDiv.textContent = `It is ${player}'s turn.`;
        };
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow||!selectedColumn||e.target.textContent||game.checkWin()) return;
        game.setBoard(selectedRow, selectedColumn, player);
        switchPlayerTurn();
        updateBoard();
        displayResults();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    restartBtn.addEventListener("click", () => {
        game.resetBoard();
        updateBoard();
        displayResults();
    });
    updateBoard()
    displayResults()
}

screenController()