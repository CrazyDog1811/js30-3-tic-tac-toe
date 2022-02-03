const gameField = document.querySelector('.game-field');
const sells = gameField.querySelectorAll('.sell');
let isX = true;

console.log(sells);


function writeSymbol(ev) {
    
    if (ev.target.classList.contains('sell') && !ev.target.classList.contains('selected')) {
        if (isX) {
            ev.target.textContent = 'x';
            ev.target.classList.add('selected');
            isX = false;
        } else {
            ev.target.textContent = '0';
            ev.target.classList.add('selected');
            isX = true;
        }
    }
}

gameField.addEventListener('click', writeSymbol);