console.log('js-campominato-dom');

const main = document.querySelector('.main-wrapper');
const btnPlay = document.querySelector('.btn');
const level = document.getElementById('level');

const levels = [ 100, 81, 49];
const totalCells = levels[level.value];
const totalBombs = 16;
let cellNumbers;
let bombPositions = [];

btnPlay.addEventListener('click', play);


function play() {
  reset();
  cellNumbers = levels[level.value];

  generatePlayground();
  generateBombs(totalBombs, totalCells);
}

function generateBombs() {

  for (let j = 0; j < totalBombs; j++) {
    let bombPosition;
    do {
      bombPosition = Math.floor(Math.random() * cellNumbers) + 1;
    } while (bombPositions.includes(bombPosition));
    bombPositions.push(bombPosition)
  }
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
  console.log(this);
  console.log(this._cellID);

  const cellID = this._cellID;
  if (bombPositions.includes(cellID)) {
    console.log('Boom! Hai colpito una bomba!');
    this.classList.add('bomb');
  }else{
    console.log('Cella sicura!');
    this.classList.add('safe');
  }

  this.classList.add('clicked');
}


function reset() {
  main.innerHTML = '';
  bombPositions = [];
}