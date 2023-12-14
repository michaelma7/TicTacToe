//game controller
const boardController = (function() {
    //cache DOM
    const gameboard = document.querySelector('.gameboard');
    const nodes = gameboard.childNodes;
    const squareArray = Array.from(nodes); //es6 only
    const turnOrder = document.querySelector('.player-turn');

    //event listeners how to make this activate only once game has started. have it called via game start?
    squareArray.forEach(place => place.addEventListener('click', (e) => {boardMove(turnOrder.lastChild.innerHTML, e.target); turnControl();}));
    
    //other variables
    let playerTurn = '';
    const seed = Math.floor(Math.random()*2);
    if(seed<1){
        //player one goes first
        playerTurn = true;
    } else {
        //player two goes first
        playerTurn = false; 
    };

    //gameboard variables and creation
    let board = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let winningCombos = {};
    for(let i=0; i<3; i++) {
        winningCombos["row"+(i+1)] = [i*3, (i*3)+1, (i*3)+2];
    }
    for(let j=0; j<3; j++) {
        winningCombos["col"+(j+1)] = [j, j+3, j+6];
    }
    winningCombos["diag1"] = [0, 4, 8];
    winningCombos["diag2"] = [2, 4, 6];

    function render(sign, position) {
        position.innerHTML = sign; 
    };

    function checkWin(sign) {
        //check for tie. loop through all children on gameboard to check if they have children
        for(let div in squareArray) {
            if(!div.hasChildNodes()) {
                continue;
            } else {
                return "Tie";
            };
        };
            
        //map position of selected sign
        let signMap = board.map((position) => position === sign);
        //check each winning condition vs current state 
        for(let combo in winningCombos) {
            let condition = winningCombos[combo];
            let line = [];
            for(let location of condition) {
              line.push(signMap[location]);
            };
            if(!line.includes(false)){
                //push to game controller to render winning player
                gameController.render(playerName);
            };
        };        
    };

    function boardMove(sign, position) {
        //check for game start and empty square
        if(!gameController.startStatus) {
            return "Game has not started!";
        } else if (position.innerHTML !== '') {
            return "Position has been filled!";
        } else {
            for(let k=0; k< board.length; k++) {
                if(board[k] === position.class) {
                    board[k] = sign;
                };
            };
            render(sign, position);
            checkWin(sign);
        };
    };

    function turnControl() {
        if(playerTurn) {
            turnOrder.innerHTML = playerController.playerOne.innerHTML;
        } else {
            turnOrder.innerHTML = playerController.playerTwo.innerHTML;
        };
        playerTurn = !playerTurn;
    };

    return {boardMove, checkWin, turnControl};
})();

const playerController = (function() {

    //cache DOM
    const form = document.querySelector('#playercreation');
    const modal = document.querySelector('.creationdialog');
    const addNew = document.querySelector('.newplayer');
    const playerName = document.querySelector('#name');
    const create = document.querySelector('.createplayer');
    const playerOne = document.querySelector('.playerone');
    const playerTwo = document.querySelector('.playertwo');

    //event listeners
    addNew.addEventListener('click', (e) => modal.showModal());
    create.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                createPlayer(playerName.value , document.querySelector('input[name=sign]:checked').value);
                                                modal.close();
                                            });
                                    
    function render(name, sign) {
        //check which div is empty
        if(!playerOne.hasChildNodes()) {
            //create div with name
            let player = document.createElement("span");
            player.className = `${name}`;
            player.innerHTML = "Name: " + `${name}`;
            //create div with sign
            let symbol = document.createElement('div');
            symbol.className = `${sign}`;
            symbol.innerHTML = "Sign: " + `${sign}`;
            playerOne.appendChild(player);
            playerOne.appendChild(symbol);
        //player two check and add
        } else if(!playerTwo.hasChildNodes()) {
            let player2 = document.createElement("span");
            player2.className = `${name}`;
            player2.innerHTML = name;
            let symbol2 = document.createElement('div');
            symbol2.className = `${sign}`;
            symbol2.innerHTML = 'Sign: ' +`${sign}`;
            playerTwo.appendChild(player2);
            playerTwo.appendChild(symbol2);
        } else {
            return "Nothing to render.";
        };
    };

    //player creation
    function createPlayer(name, sign) {
        let wins = 0;
        const getWins = () => wins;
        const won = () => win++;
        form.reset();
        render(name, sign);
        return { name, sign, wins, getWins, won };
    };

    function deletePlayer(name) {
        //find player and delete
        let player = document.querySelector(`${name}`);
        player.removeChild(player.firstChild());
        player.removeChild(player.firstChild());
    };

    function winningPlayer() {

    };

    return {createPlayer, deletePlayer, winningPlayer, playerOne, playerTwo};
})();

const gameController = (function(){
    //DOM cache
    const reset = document.querySelector('.reset');
    const start = document.querySelector('.start');
    const AI = document.querySelector('.AI');
    const startModal = document.querySelector('.startdialog');
    const overlay = document.querySelector('.overlay');
    const closeModal = document.querySelector('.modal-close');
    const gameStart = document.querySelector('.modal-submit');

    //eventlisteners
    reset.addEventListener('click', (e) => restart());
    start.addEventListener('click', (e) => startGame());
    AI.addEventListener('click', (e) => playComputer());
    closeModal.addEventListener('click', (e) => startModal.close());
    gameStart.addEventListener('click', (e) => {e.preventDefault(); boardController.turnControl(); startModal.close();});

    //other variables
    let startStatus = false;

    function startGame() {

        //check that there are two players
        if(!playerController.playerTwo.hasChildNodes || !playerController.playerOne.hasChildNodes) {
            return console.log("Not enough players");
        } else {
            startStatus = true;
        };
        //open modal to confirm game start
        startModal.showModal();
        //push to turn order function
    };

    function restart() {
        window.location.reload();
    };

    function render(name) {
        startStatus = false;
        return `${name}` + " Wins!";
    };

    function playComputer() {
        //create player with name computer and random sign or sign not taken
        playerController.createPlayer('Computer', sign);
        //start game
        startGame();
    };

    return {startStatus, restart};
})();




