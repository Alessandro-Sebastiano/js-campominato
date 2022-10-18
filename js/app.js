
const playBtn = document.getElementById('play');


function startPlay() {

    const gridBox = document.getElementById('grid-box');
    const grid = document.createElement('div');


    const BOMB_NUMBER = 16;
    const locationsAssigned = [];


    let numOfCell;
    const select = document.getElementById('select');
    const difficulty = select.value;
    gridBox.innerHTML = ''
    const resetBtn = document.getElementById('reset-button');
    console.log('Gioco iniziato...')

    switch (difficulty) {

        case '1':
        default:
            numOfCell = 100;
            break;

        case '2':
            numOfCell = 81;
            break;

        case '3':
            numOfCell = 49;
            break;
    }


    function mkBomb() {

        while (locationsAssigned.length < BOMB_NUMBER) {
            const bombPosition = Math.floor(Math.random() * (numOfCell - 1) + 1);
            if (!locationsAssigned.includes(bombPosition)) {
                locationsAssigned.push(bombPosition);
            }
        }

        console.log(locationsAssigned);
    }

    mkBomb();


    function mkCell(cellNumber) {

        const cell = document.createElement('div');
        cell.innerHTML = `<span>${cellNumber}</span>`
        cell.className = 'cell';
        const cellForLine = Math.sqrt(numOfCell);

        //console.log(cellForLine);

        cell.style.width = `calc(100% / ${cellForLine})`;
        cell.style.height = `calc(100% / ${cellForLine})`;
        grid.appendChild(cell);
        cell.addEventListener('click', () => {
            if (!locationsAssigned.includes(cellNumber) && !cell.classList.contains('cell-pass')) {
                cell.classList.add('cell-pass');
                if (!cell.classList.contains('cell-pass')) {
                    console.log('cella numero: ' + cellNumber);
                }
            } else if (locationsAssigned.includes(cellNumber)) {
                cell.classList.add('cell-bomb');
            }


            resetBtn.addEventListener('click', () => {
                cell.classList.remove('cell-pass');
            })
        })


    }

    function mkGrid() {
        grid.className = 'grid';
        gridBox.appendChild(grid);
        for (let i = 1; i <= numOfCell; i++) {
            mkCell(i);
        }
    }


    mkGrid();

}


playBtn.addEventListener('click', startPlay);