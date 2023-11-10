//game controller
const boardController = (function() {
    //cache DOM
    const gameboard = document.querySelector('.gameboard');
    const nodes = gameboard.childNodes;
    const squareArray = Array.from(nodes); //es6 only

    //event listeners
    squareArray.forEach(place => place.addEventListener('click', (e) => boardMove(player, e.target))); // move to game start function? how to disable during player creation

    //gameboard variables and creation
    let gameStart = false;
    let board = ['', '', '', '', '', '', '', '', ''];
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
        //if some win condition then open modal?   
    };

    function checkWin() {
        //check for ties
        if(!board.includes('')) {
            return "Tie!";
        };
        //map current positions
        let xMap = board.map((position) => position === 'X');
        let oMap = board.map((position) => position === 'O'); 
        for(let combo in winningCombos) {
            let condition = winningCombos[combo];
            let x = [];
            let y = [];
            for(let location of condition) {
              x.push(xMap[location]);
              y.push(oMap[location]);
            };
            if(!x.includes(false) || y.includes(!false)){
                return "Win!";
            };
        };
        //push this to another render function that opens a modal for winning situation
    };

    function boardMove(sign, position) {
        //check for game start and empty square
        if(!gameStart) {
            return "Game has not started!";
        } else if (position.innerHTML !== '') {
            return "Position has been filled!";
        } else {
            for(let k=0; k< board.length; k++) {
                if(board[k] === position.class) {
                    board[k] = sign;
                };
            };
            //check for win
            render(sign, position);
            checkWin();
        };
    };


    return { boardMove, checkWin};
})();

const playerController = (function() {

    //cache DOM
    const form = document.querySelector('#playercreation');
    const modal = document.querySelector('.creationdialog');
    const addNew = document.querySelector('.newplayer');
    const playerName = document.querySelector('#name');
    const playerSign = document.querySelector('input[name=sign]:checked');
    const create = document.querySelector('.createplayer');

    //event listeners
    addNew.addEventListener('click', (e) => modal.showModal());
    create.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                createPlayer(playerName.value , playerSign.value);
                                                modal.close();
                                            });
                                    
    function render(name, sign) {
        
    };

    //player creation
    function createPlayer(name, sign) {
        let wins = 0;
        const getWins = () => wins;
        const won = () => win++;
        form.reset();
        //add player to DOM via another function
        render(name, sign);
        return { name, sign, wins, getWins, won };
    };

    function addPlayer(name, sign) {

    };

    function deletePlayer(name) {
        //find player and delete
        let player = document.querySelector(`${name}`);
        player.innerHTML = '';
        
    };

    return {createPlayer, deletePlayer};
})();

const gameController = (function(){
    //DOM cache
    const reset = document.querySelector('.reset');
    const start = document.querySelector('.start');
    const AI = document.querySelector('.AI');

    //eventlisteners
    reset.addEventListener('click', (e) => restart());
    start.addEventListener('click', (e) => startGame());
    AI.addEventListener('click', (e) => playComputer());

    function startGame() {
        gameStart = true;
        //set game start to true
        //take the two players a select who goes first randomly or add an option to select who goes first
        //allow players to then interact with board and add signs
        //call a function to notify users to start placing signs
    };

    function restart() {
        window.location.reload();
    };

    function playComputer() {
        //create player with name computer and random sign or sign not taken
        //start game
        startGame();
    };

    function render() {

    };

    return {startGame, playComputer, restart};
})();




