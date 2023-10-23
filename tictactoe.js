//game board module
const gameBoard = (function () {
    const row1 = ["", "" ,""];
    const row2 = ["", "" ,""];
    const row3 = ["", "" ,""];
    const emptyBoard = [];
    emptyBoard.push(row1).push(row2).push(row3);
    return {emptyBoard};
})();

//display controller
function boardMove (player, position) {
    position.innerHTML() = player.sign;    
    return {};
}

//player creation
function createPlayer (name, sign) {
    let wins = 0;
    const getWins = () => wins;
    const won = () => win++;
    return {name, sign, wins};
}


