const gameBoard = (() => {
    const array = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    return {array};
})();

const displayController = (() => {
    const {array} = gameBoard;
    const displayWrapper = document.querySelector(".grid-wrapper")
    let cellCounter = 0;
    const displayGrid = () => {array.forEach((item) => {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-key", cellCounter);
        cellCounter += 1;
        cell.innerText = item;
        displayWrapper.appendChild(cell);
    })};
    return {displayGrid};
})();

displayController.displayGrid();

const players = (name, name2) => {
    const playerOne = {name, token: "X"};
    const playerTwo = {name2, token: "O"};
    const playerList = [playerOne, playerTwo];
    return {playerList};
};

console.log(players("Bryan", "Ryan").playerList)

const gameController = (name, name2) => {
    const {array} = gameBoard;
    const {playerList} = players();
    const {displayController} = displayController;
    let activePlayer = playerList[0]
    const switchTurn = () => {

    }
}