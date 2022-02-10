const gameField = document.querySelector('.game-field');
const sells = gameField.querySelectorAll('.sell');
const sellsArr = [...sells];
const wrapperInterface = document.querySelector('.wrapper-interface');
const startBtn = wrapperInterface.querySelector('.modal-btn');
const modalContent = wrapperInterface.querySelector('.modal-content');
const score = wrapperInterface.querySelector('.score');
const recordsContent = document.querySelector('.records');
const records = document.querySelector('.table>p');

const arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let isX = true;
let result = '';
let count = 0;
const resArr = [];

const createRecords = () => {
    recordsContent.innerHTML = '';
    console.log(resArr.length);
    for(let i = 0; i < resArr.length; i++) {
        let recordEl = document.createElement('span');
        recordEl.textContent = `${resArr[i]}`;
        if(recordsContent) {
            recordsContent.insertAdjacentElement('afterbegin', recordEl);
        }
    }
}

const showRecords = () => {
    recordsContent.classList.toggle('active');
}


function writeSymbol(ev) {
    if (ev.target.classList.contains('sell') && ev.target.innerHTML !== 'x' && ev.target.innerHTML !== '0') {
        if (isX) {
            ev.target.innerHTML = 'x';
            // ev.target.classList.add('x');
            isX = false;
        } else {
            ev.target.innerHTML = '0';
            //  ev.target.classList.add('0');
            isX = true;
        }
    }
    count++;
    check();
}

function check() {
    for (let i = 0; i < arr.length; i++) {
        if (sells[arr[i][0]].innerHTML === 'x' && sells[arr[i][1]].innerHTML === 'x' && sells[arr[i][2]].innerHTML === 'x') {
            sells[arr[i][0]].classList.add('winner');
            sells[arr[i][1]].classList.add('winner');
            sells[arr[i][2]].classList.add('winner');
            result = "won the crosses";
            GameOver(result);
        } else if (sells[arr[i][0]].innerHTML === '0' && sells[arr[i][1]].innerHTML === '0' && sells[arr[i][2]].innerHTML === '0') {
            sells[arr[i][0]].classList.add('winner');
            sells[arr[i][1]].classList.add('winner');
            sells[arr[i][2]].classList.add('winner');
            result = 'Zeros won';
            GameOver(result);
        }
    }

    if (!result && sellsArr.every(sell => sell.innerHTML === 'x' || sell.innerHTML === '0')) {
        sells.forEach(sell => {
            sell.classList.add('draw');
        })
        result = 'draw. No one won';
        GameOver(result);
    }
}

const GameOver = (res) => {
    setTimeout(() => {
        wrapperInterface.style.display = 'grid';
        modalContent.textContent = res;
        score.textContent = `${count} moves made`;
        if(resArr.length < 10) {
            resArr.push(`${res}. ${count} moves made`);
        } else {
            resArr.shift();
            resArr.push(`${res}. ${count} moves made`);
        }
        setLoaclStorage();
    }, 1000)
}

const newGame = () => {
    sells.forEach(sell => {
        sell.innerHTML = '';
        sell.classList.remove('winner');
        sell.classList.remove('draw');
    })
    wrapperInterface.style.display = 'none';
    result = '';
    isX = true;
    count = 0;
    createRecords();
}

const setLoaclStorage = () => {
    localStorage.setItem('lastReults', resArr);
}

const getLocalStorage = () => {
    if(localStorage.getItem('lastResults')) {
        resArr = localStorage.getItem('lastResults');
        confirm.log(resArr);
    }
}

gameField.addEventListener('click', writeSymbol);
startBtn.addEventListener('click', newGame);
records.addEventListener('click', showRecords)
window.addEventListener('load', getLocalStorage);