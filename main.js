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
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
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
    _playersArr = [
        { name: "Player X", active: true, token: "X" },
        { name: "Player Y", active: false, token: "O" },
    ];

    const setPlayerNames = (name1, name2) => {
        _playersArr[0].name = name1;
        _playersArr[1].name = name2;
    };

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
        setPlayerNames(name1, name2);
    };

    const processEntry = (x, y) => {
        if (board.checkEmptyCell(x, y)) {
            board.updateBoard(getActivePlayer(), x, y);
            let pastPlayer = getActivePlayer();
            switchActivePlayer();
            return pastPlayer;
        } else {
            console.log("this cell is already occupied");
        }
    };

    const playRound = (x, y) => {
        if (board.checkEmptyCell(x, y)) {
            board.updateBoard(getActivePlayer(), x, y);
        } else {
            console.log("this cell is already occupied");
        }
        if (board.getStatus() == "WIN") {
            display.printEnd(getActivePlayer());
        } else if (board.getStatus() == "DRAW") {
            display.printEnd();
        }
        switchActivePlayer();
        display.printBoard();
    };

    const startGame = () => {
        display.printBoard();
    };

    return { startGame, playRound };
}
const game = gameController();

function displayController() {
    const gridElem = document.getElementById("grid");
    const dialog = document.getElementById("dialog");
    const dialogMessage = document.getElementById("dialog-message");

    const printBoard = () => {
        let boardArr = board.getBoard();
        gridElem.innerHTML = "";
        for (let y in boardArr) {
            for (let x in boardArr[y]) {
                let cellElem = document.createElement("div");
                cellElem.classList.add("cell");
                cellElem.textContent = boardArr[y][x];
                cellElem.addEventListener("click", () => {
                    game.playRound(x, y);
                });
                gridElem.appendChild(cellElem);
            }
        }
    };

    const printEnd = (player = null) => {
        if (player !== null) {
            dialogMessage.textContent = `${player.name} WON!!!`;
        } else {
            dialogMessage.textContent = "DRAW...";
        }
        dialog.showModal();
    };

    return { printBoard, printEnd };
}
const display = displayController();

game.startGame();
