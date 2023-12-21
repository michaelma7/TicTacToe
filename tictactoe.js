//game controller
const boardController = (function() {
    //cache DOM
    const gameboard = document.querySelector('.gameboard');
    const nodes = gameboard.children;
    const squareArray = Array.from(nodes); //es6 only
    const turnOrder = document.querySelector('.player-turn');

    //event listeners
    squareArray.forEach(place => place.addEventListener('click', (e) => boardMove(turnOrder.innerHTML, e.target)));
    
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
        //check for tie. loop through and check for empty squares
        let i = 0;
        for(let div in squareArray) {
            if(!squareArray[div].hasChildNodes()) {
                break
            } else if(i===8){
                let tie = won(sign);
                if(tie) {
                    break;
                } else {
                    gameController.render('tie');
                };
            } else {
                i++;
            };
        };
        won(sign);

        function won(sign) {
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
                    gameController.render(sign);
                    //if all spots are filled but someone wins properly show winner
                    return true;
                } else {
                    continue
                };
            };
             
        };           
    };

    function boardMove(sign, position) {
        //check for game start and empty square
        if(!gameController.checkGameStart()) {
            errorController.errorMsg('gamestart');
        } else if (position.innerHTML !== '') {
            errorController.errorMsg('filled');
        } else {
            for(let k=0; k< board.length; k++) {
                if(board[k] === position.className) {
                    board[k] = sign;
                };
            };
            render(sign, position);
            checkWin(sign);
            turnController.turnControl();
        };
    };

    function boardReset() {
        //find each div with a child and remove child
        for(let place in squareArray) {
            if(squareArray[place].hasChildNodes()) {
                let child = squareArray[place].firstChild;
                squareArray[place].removeChild(child);
            } else {
                continue
            };
        };
        board = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    };

    return {boardMove, boardReset};
})();

const turnController = (function() {
    const turnOrder = document.querySelector('.player-turn');
    let playerTurn = '';

    function firstMove() {
        let seed = Math.floor(Math.random()*2);
        if(seed<1){
            //player one goes first
            playerTurn = true;
        } else {
            //player two goes first
            playerTurn = false; 
        };
        turnControl();
    };

    function turnControl() {
        if(playerTurn) {
            turnOrder.innerHTML = playerController.playerOne.lastChild.innerHTML;
        } else {
            turnOrder.innerHTML = playerController.playerTwo.lastChild.innerHTML;
        };
        playerTurn = !playerTurn;
    };

    return {turnControl, firstMove};
})();

const errorController = (function () {
    //DOM cache
    const errorModal = document.querySelector('.errordialog');
    const closeModal = document.querySelector('.modal-close');
    const overlay = document.querySelector('.overlay');
    const errorMessage = document.querySelector('.errormessage');

    //eventlisteners
    closeModal.addEventListener('click', (e) => {errorModal.classList.add('hidden'); overlay.classList.add('hidden');});

    function errorMsg(error) {
        let msg = '';
        switch(error){
            case 'players':
                msg = 'Not enough players. Please make two players or play with the computer!';
                errorMessage.innerHTML = msg;
                errorModal.classList.remove('hidden');
                overlay.classList.remove('hidden');
                break;
            case 'gamestart':
                msg = 'The game has not started yet! Please start the game.';
                errorMessage.innerHTML = msg;
                errorModal.classList.remove('hidden');
                overlay.classList.remove('hidden');
                break;
            case 'filled':
                msg = 'This space has already been filled. Please select an empty square.';
                errorMessage.innerHTML = msg;
                errorModal.classList.remove('hidden');
                overlay.classList.remove('hidden');
                break;
            default:
                msg = 'Something went wrong. Whoops!';
                errorMessage.innerHTML = msg;
                errorModal.classList.remove('hidden');
                overlay.classList.remove('hidden');
        }
    };

    return {errorMsg};
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
    const overlay = document.querySelector('.overlay');

    //event listeners
    addNew.addEventListener('click', (e) => {overlay.classList.remove('hidden'); modal.classList.remove('hidden');});
    create.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                createPlayer(playerName.value , document.querySelector('input[name=sign]:checked').value);
                                                modal.classList.add('hidden');
                                                overlay.classList.add('hidden');
                                            });
                                    
    function render(name, sign) {
        //check which div is empty
        if(!playerOne.hasChildNodes()) {
            //create div with name
            let player = document.createElement("span");
            player.className = `${name}`;
            player.innerHTML = name;
            //create div with sign
            let symbol = document.createElement('span');
            symbol.className = `${sign}`;
            symbol.innerHTML = sign;
            playerOne.appendChild(player);
            playerOne.appendChild(symbol);
        //player two check and add
        } else if(!playerTwo.hasChildNodes()) {
            let player2 = document.createElement("span");
            player2.className = `${name}`;
            player2.innerHTML = name;
            let symbol2 = document.createElement('span');
            symbol2.className = `${sign}`;
            symbol2.innerHTML = sign;
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

    function deletePlayer(playerDiv) {
        //find player and delete
        let player = playerDiv.parentNode;
        player.removeChild(player.firstChild);
        player.removeChild(player.firstChild);
    };

    return {createPlayer, deletePlayer, playerOne, playerTwo};
})();

const gameController = (function(){
    //DOM cache
    const reset = document.querySelector('.reset');
    const start = document.querySelector('.start');
    // const AI = document.querySelector('.AI');
    const resultModal = document.querySelector('.onemore');
    const winMessage = document.querySelector('.winningmsg');
    const playAgain = document.querySelector('.playagain');
    const overlay = document.querySelector('.overlay');

    //eventlisteners
    reset.addEventListener('click', (e) => restart());
    start.addEventListener('click', (e) => startGame());
    // AI.addEventListener('click', (e) => playComputer());
    playAgain.addEventListener('click', (e) => {
                                                    resultModal.classList.add('hidden'); 
                                                    boardController.boardReset();
                                                    overlay.classList.add('hidden'); 
                                                    startGame(); 
                                                });

    //other variables
    let startStatus = false;

    function startGame() {
        //if game is started already do nothing
        if(startStatus){
            return
        };
        //check that there are two players
        if(!playerController.playerTwo.hasChildNodes() || !playerController.playerOne.hasChildNodes()) {
            errorController.errorMsg('players');
            return
        } else {
            startStatus = true;
            //push to turn order function
            turnController.firstMove();
        };
    };

    function checkGameStart() {
        if(!startStatus){
            return false;
        }
        else{
            return true;
        }
    }

    function restart() {
        window.location.reload();
    };

    //move this to another module to not expose render to js injection?
    function render(sign) {
        startStatus = false;
        if(sign==='tie'){
            let msg = 'Tie!';
            winMessage.innerHTML = msg;
            overlay.classList.remove('hidden');
            resultModal.classList.remove('hidden'); 
        } else {
            let signDiv = document.querySelector('.'+`${sign}`);
            let nameDiv = signDiv.parentNode.firstChild;
            let name = nameDiv.className;
            let msg = `${name}` + " Wins!";
            winMessage.innerHTML = msg;
            overlay.classList.remove('hidden');
            resultModal.classList.remove('hidden'); 
        };
    };

    function playComputer() {
        //create player with name computer and random sign or sign not taken
        playerController.createPlayer('Computer', sign);
        //start game
        startGame();
    };

    return {checkGameStart, render};
})();

const AIController = (function() {
    function computerAction() {

    };
})();




