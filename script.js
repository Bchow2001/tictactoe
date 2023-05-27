const gameBoard = (() => {
    const array = new Array(9).fill(null);
    return {array};
})();

const displayController = (() => {
    const {array} = gameBoard;
    const displayWrapper = document.querySelector(".grid-wrapper")
    let cellCounter = 0;
    const displayGrid = () => {
        displayWrapper.innerHTML=""
        array.forEach((item) => {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-id", cellCounter);
        cellCounter += 1;
        cell.innerText = item;
        displayWrapper.appendChild(cell);
    })};
    return {displayGrid};
})();

displayController.displayGrid();

const playerList = (() => {
    const playerOne = {name: "Player One", token: "X"};
    const playerTwo = {name: "Player Two", token: "O"};
    const players = [playerOne, playerTwo];
    return {players};
})();


const gameController = (square) => {
    const {array} = gameBoard;
    const {players} = playerList;
    let activePlayer = players[0];
    const switchTurns = () => { 
        activePlayer = activePlayer === players[0] ? players[1] : players [0];
    };
    const placeMarker = () => {
        const cell = document.querySelector(`[data-id = "${square}"]`)
        array[square] = activePlayer.token
        displayController.displayGrid()
        switchTurns()
    };
    return {placeMarker}
};

gameController(2).placeMarker()