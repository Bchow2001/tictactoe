/* eslint-disable no-underscore-dangle */
const displayWrapper = document.querySelector(".grid-wrapper")

const gameBoard = (() => {
    const array = new Array(9).fill(null);
    return {array};
})();

const displayController = (() => {
    const {array} = gameBoard;
    const displayGrid = () => {
        displayWrapper.innerHTML=""
        let _cellCounter = 0;
        array.forEach((item) => {
        const cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("data-key", _cellCounter);
        _cellCounter += 1;
        cell.innerText = item;
        displayWrapper.appendChild(cell);
    })}
    return {displayGrid};
})();

const playerList = (() => {
    const _playerOne = {name: "Player One", token: "X"};
    const _playerTwo = {name: "Player Two", token: "O"};
    const players = [_playerOne, _playerTwo];
    return {players};
})();



const gameController = (() => {
    displayController.displayGrid();
    const restartBtn = document.querySelector("#restart");
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
        let roundWon = "ongoing"
        for (let i = 0; i < winConditions.length; i++) {
            const a = array[winConditions[i][0]];
            const b = array[winConditions[i][1]];
            const c = array[winConditions[i][2]];
            if (a === b && b === c && a !== null) {
                roundWon = "win";
                break;
            }};
        if (array.every(item => item !== null) && roundWon === "ongoing") {
            roundWon = "tie"
        };
        return {roundWon}
    });

    const computerRandomMove =(() => {
        const _getRandomNumber = () => Math.floor((Math.random() * 9));
        const _randomMove = () => {
            let _randomNumber = _getRandomNumber();
            if (array[_randomNumber] === null){
                array[_randomNumber] = activePlayer.token
                displayController.displayGrid();
            } else {
                _randomNumber = _getRandomNumber();
                _randomMove();
            }
        };
        _randomMove();
    });

    const displayModal = (() => {
        const modal = document.querySelector(".result-modal");
        const span = document.querySelector(".close");
        const modalContent = document.querySelector(".modal-content")
        const message = document.querySelector(".message-div")
        if (winChecker().roundWon === "win") {
            message.innerHTML = "";
            message.innerText = `${activePlayer.token} Won`;
        } else if (winChecker().roundWon === "tie") {
            message.innerHTML = "";
            message.innerText ="Tie";
        }
        modalContent.appendChild(message)
        modal.style.display = "block"
        span.onclick = () => {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }      
    });

    const restart = (() => {
        array.fill(null);
        displayController.displayGrid();
        displayWrapper.addEventListener("click", addToken);
        [activePlayer] = players;
    });

    

    const addToken = (e) => {
        if (e.target && e.target.matches(".cell") && array[e.target.dataset.key] === null) {
            array[e.target.dataset.key] = activePlayer.token;
            displayController.displayGrid();
            if (winChecker().roundWon === "win"){
                displayModal();
                displayWrapper.removeEventListener("click", addToken)
                return;
            } 
            if (winChecker().roundWon === "tie") {
                displayModal();
                displayWrapper.removeEventListener("click", addToken)
                return;
            }
            switchTurns();
            computerRandomMove();
            if (winChecker().roundWon === "win"){
                displayModal();
                displayWrapper.removeEventListener("click", addToken)
                return;
            } 
            if (winChecker().roundWon === "tie") {
                displayModal();
                displayWrapper.removeEventListener("click", addToken)
                return;
            }
            switchTurns();
        };
    };

    restartBtn.addEventListener("click", restart);
    displayWrapper.addEventListener("click", addToken);

})();

