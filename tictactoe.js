//game controller
const gameController = (function() {
    //decide whether to have empty board in html or render via js
    // function gameBoard() {
    //     const emptyBoard = [];
    //     for(let x=0; x<3; x++){
    //         for(let y=0; y<3; y++){
    //             addCell(gameBoard, x, y);
    //         };
    //     }
    //     function addCell(map, rows, columns){
    //         map[x][y] = '';
    //     }
    //     render(emptyBoard);
    // };

    //cache DOM
    const form = document.querySelector('.playercreation');
    const modal = document.querySelector('dialog');
    const addNew = document.querySelector('.newplayer');
    const playerName = document.querySelector('#name');
    const playerSign = document.querySelector('#sign');
    const create = document.querySelector('.createplayer');
    const reset = document.querySelector('.reset');
    const start = document.querySelector('.start');
    const AI = document.querySelector('.AI');

    //event listeners
    addNew.addEventListener('click', modal.showModal())
    create.addEventListener('click', (e) => {
                                                e.preventDefault();
                                                createPlayer(playerName.value , playerSign.value);
                                                modal.close();
                                            });
    reset.addEventListener('click', (e) => restart());
    start.addEventListener('click', (e) => startGame();)
    AI.addEventListener('click', playComputer());

    function render(boardState) {
        // const target = document.querySelector('.gameboard');
        // if (!target.haschildNode()) {
        //     target.removeChild(target.firstChild);
        //     target.appendChild(boardState);
        // } else {
        //     target.appendChild(boardState);
        // };      
    };

    function checkWin() {
        if(three in a row check rows, columns and two diags){

        };
    };

    function boardMove (player, position) {
        position.innerHTML() = player.sign;
        checkWin();
        render(currentState);    
    };

    function startGame() {

    };

    function restart() {

    };

    function playComputer() {

    };

    //player creation
    function createPlayer (name, sign) {
        let wins = 0;
        const getWins = () => wins;
        const won = () => win++;
        form.reset();
        //add render to DOM
        render();
        return { name, sign, wins, getWins, won };
    };

    return { boardMove, createPlayer, startGame, playComputer, reset };
})();

//player controller is this necessary?
const playerController = (function() {

})();





