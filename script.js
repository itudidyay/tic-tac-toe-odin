const Gameboard = (() => {
    const board = []

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
    const printBoard = () => {
        const printOfBoard = board.map((row) =>
            row.map((cell) => cell.getValue()))
        console.log(printOfBoard);
    } 
    const checkWin = () => {
        // Check row & column
        for (let i = 0; i < 3; i++) {
            if (board[i][0].getValue() == undefined || board[0][i].getValue() == undefined) {
                break;
            }
            if (board[i][0].getValue() == board[i][1].getValue() &&
            board[i][1].getValue() == board[i][2].getValue()) {
                return true;
            }
            if (board[0][i].getValue() == board[1][i].getValue() &&
            board[1][i].getValue() == board[2][i].getValue()) {
                return true;
            }
        }
        // Check diagonal
        if (board[0][0].getValue() == board[1][1].getValue() &&
            board[1][1].getValue() == board[2][2].getValue() &&
            board[2][2].getValue() != undefined) {
            return true;
        };
        if (board[0][2].getValue() == board[1][1].getValue() &&
            board[1][1].getValue() == board[2][0].getValue() &&
            board[2][2].getValue() != undefined) {
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

    return {getBoard, setBoard, printBoard, checkWin, checkEndOfGame} 

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
    const board = game.getBoard();
    const boardDiv = document.querySelector(".board")
    let player = "X";

    const switchPlayerTurn = () => {
        player == "X" ? player = "O" : player = "X";
    };

    const updateBoard = () => {
        boardDiv.textContent = "";
        board.forEach(row => {row.forEach(cell => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.row = cell.getRowIndex();
            cellButton.dataset.column = cell.getColumnIndex();
            cellButton.textContent = cell.getValue();
            boardDiv.appendChild(cellButton);   
        })
        });
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        if (!selectedRow||!selectedColumn||e.target.textContent) return;
        //console.log(`${selectedRow}, ${selectedColumn}`);
        game.setBoard(selectedRow, selectedColumn, player);
        switchPlayerTurn();
        updateBoard();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateBoard()
}

screenController()