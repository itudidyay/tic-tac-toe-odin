const Gameboard = (() => {
    const board = []

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
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

    const setValue = (player) => {
        value = player;
    };
    const getValue = () => {
        return value;
    };

    return {
        setValue,
        getValue
    };
}

// const game = Gameboard;
// console.log(game.checkWin());
// console.log(game.checkEndOfGame());
// for (let row = 0; row < 3; row++) {
//     for (let col = 0; col < 3; col++) {
//         game.setBoard(row,col,Math.random())
//     };
// };
// game.printBoard();
// console.log(game.checkWin());
// console.log(game.checkEndOfGame());
