const displayWrapper = document.querySelector(".grid-wrapper")

const gameBoard = (() => {
    const array = new Array(9).fill(null);
    return {array};
})();

const displayController = (() => {
    const {array} = gameBoard;
    const displayGrid = () => {
        displayWrapper.innerHTML=""
        let cellCounter = 0;
        array.forEach((item) => {
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

const playerList = (() => {
    const playerOne = {name: "Player One", token: "X"};
    const playerTwo = {name: "Player Two", token: "O"};
    const players = [playerOne, playerTwo];
    return {players};
})();


const gameController = (() => {
    const {array} = gameBoard;
    const {players} = playerList;
    let activePlayer = players[0];
    const switchTurns = (() => { 
        activePlayer = activePlayer === players[0] ? players[1] : players [0];
    });
    const winChecker =(() => {
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ]
        let roundWon = false
        winConditions.forEach((item) => {
            const a = array[item[0]];
            const b = array[item[1]];
            const c = array[item[2]];
            if (a === b && b === c && a !== null) {
                roundWon = true;
            }
        })
        return {roundWon};
    });
    displayWrapper.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".cell")&& array[e.target.dataset.key] === null) {
            array[e.target.dataset.key] = activePlayer.token;
            displayController.displayGrid();
            if (winChecker().roundWon === true) {
                alert(`${activePlayer.token} Won`)
            }
            switchTurns();
        };
})})();

