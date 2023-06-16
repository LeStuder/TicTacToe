function boardController() {
    let _board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    const getStatus = () => {
        const checkArr = [
            _board[0],
            _board[1],
            _board[2],
            [_board[0][0], _board[1][0], _board[2][0]],
            [_board[0][1], _board[1][1], _board[2][1]],
            [_board[0][2], _board[1][2], _board[2][2]],
            [_board[0][0], _board[1][1], _board[2][2]],
            [_board[2][0], _board[1][1], _board[0][2]],
        ];

        const checkWin = (arr) => {
            if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== null) {
                return true;
            }
        };

        const checkDraw = (arr) => {
            if (arr.includes("X") && arr.includes("Y")) {
                return true;
            } else {
                return false;
            }
        };

        if (checkArr.some(checkWin)) {
            return "WIN";
        } else if (checkArr.every(checkDraw)) {
            return "DRAW";
        } else {
            return false;
        }
    };

    const getBoard = () => {
        return _board;
    };

    const emptyBoard = () => {
        _board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    };

    const checkEmptyCell = (x, y) => {
        return _board[y][x] === null;
    };

    const updateBoard = (player, x, y) => {
        _board[y][x] = player.token;
    };

    return { emptyBoard, getStatus, updateBoard, checkEmptyCell, getBoard };
}
const board = boardController();

function gameController() {
    const _dialog = document.getElementById("dialog");

    _playersArr = [
        { name: "Player X", active: true, token: "X" },
        { name: "Player Y", active: false, token: "O" },
    ];

    const switchActivePlayer = () => {
        for (let i in _playersArr) {
            _playersArr[i].active = _playersArr[i].active ? false : true;
        }
    };

    const setActivePlayer = (index = 0) => {
        !_playersArr[index].active ? switchActivePlayer() : null;
    };

    const getActivePlayer = () => {
        return _playersArr[0].active ? _playersArr[0] : _playersArr[1];
    };

    const restartGame = () => {
        board.emptyBoard();
        setActivePlayer();
        display.printBoard();
        _dialog.close();
    };

    const playRound = (x, y) => {
        let validRound = board.checkEmptyCell(x, y);
        if (validRound) {
            board.updateBoard(getActivePlayer(), x, y);
        } else {
            console.log("this cell is already occupied");
        }
        if (validRound) {
            if (board.getStatus() == "WIN") {
                display.printEnd(getActivePlayer());
            } else if (board.getStatus() == "DRAW") {
                display.printEnd();
            }
            switchActivePlayer();
        }
        display.printBoard();
    };

    const startGame = () => {
        display.printBoard();
    };

    return { startGame, playRound, restartGame };
}
const game = gameController();

function displayController() {
    const _gridElem = document.getElementById("grid");
    const _dialog = document.getElementById("dialog");
    const _dialogMessage = document.getElementById("dialog-message");

    const printBoard = () => {
        let boardArr = board.getBoard();
        _gridElem.innerHTML = "";
        for (let y in boardArr) {
            for (let x in boardArr[y]) {
                let cellElem = document.createElement("div");
                cellElem.classList.add("cell");
                cellElem.textContent = boardArr[y][x];
                cellElem.addEventListener("click", () => {
                    game.playRound(x, y);
                });
                _gridElem.appendChild(cellElem);
            }
        }
    };

    const printEnd = (player = null) => {
        if (player !== null) {
            _dialogMessage.textContent = `${player.name} WON!!!`;
        } else {
            _dialogMessage.textContent = "DRAW...";
        }
        _dialog.showModal();
    };

    return { printBoard, printEnd };
}
const display = displayController();

game.startGame();
