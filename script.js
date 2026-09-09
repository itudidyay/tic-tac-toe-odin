const Gameboard = (() => {
    const board = []

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
    const setBoard = (column, row, player) => {
        board[row][column].setValue(player);
    };
    const printBoard = () => {
        const printOfBoard = board.map((row) =>
            row.map((cell) => cell.getValue()))
        console.log(printOfBoard);
    } 

    return {getBoard, setBoard, printBoard} 

})();

function Cell() {
    let value = null;

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