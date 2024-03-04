console.log('js-campominato-dom');

const main = document.querySelector('.main-wrapper');
const btnPlay = document.querySelector('.btn');
const level = document.getElementById('level');

const levels = [ 100, 81, 49];
const totalCells = levels[level.value];
let cellNumbers;
const totalBombs = 16;
let bombs = [];

btnPlay.addEventListener('click', play);


function play() {
  reset();
  cellNumbers = levels[level.value];

  bombs = generateBombs();
  generatePlayground();
}

function generateBombs() {

    const bombsTemp = [];
  while (bombsTemp.length < totalBombs) {
    const bombId = Math.ceil(Math.random() * cellNumbers);
    if (!bombsTemp.includes(bombId)) bombsTemp.push(bombId);
  }
  return bombsTemp;
}

function generatePlayground() {
  const grid  = document.createElement('div');
  grid.className = 'grid';

  for (let i = 1; i <= cellNumbers; i++) {
    const cell = createCell(i);
    grid.append(cell);
  }

  main.append(grid);
}

function createCell(index) {
  const cell = document.createElement('div');

  cell.className = 'cell';
  cell.classList.add('square' + cellNumbers);
  cell._cellID = index;
  cell.addEventListener('click', handleClick);
  return cell;
}

function handleClick() {
  console.log(bombs.includes(this._cellID));

  const cellID = this._cellID;
  if (bombs.includes(cellID)) {
    endGame(false);
    console.log('Boom! Hai colpito una bomba!');
    this.classList.add('bomb');
  }else{
    console.log('Cella sicura!');
    this.classList.add('safe');
  }

  this.classList.add('clicked');
}

function endGame() {
  showBombs();
  blockGrid();
}

function blockGrid() {
  const endGameEl = document.createElement('div');
  endGameEl.className = 'end-game';
  main.append(endGameEl);
}

function showBombs() {

  const cells = document.querySelectorAll('.cell')
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    console.log(cell._cellID);
    if (bombs.includes(cell._cellID)) {
      cell.classList.add('bomb');
    }
  }
}


function reset() {
  main.innerHTML = '';
  bombs = [];
}