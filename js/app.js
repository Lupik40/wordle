import { dictionary } from './dictionary.js';

let blockHeight = 6;
let blockWidth = 5;

let currRow = 0;

let word = getRandomWord();
let gameWin = false;

const gamePlace = document.getElementById('game-place');
const gameCheck = document.querySelector('.game__btn_check');
const gameReset = document.querySelector('.game__btn_reset');

function getRandomWord() {
  let randomNum = Math.random() * dictionary.length | 0;
  return dictionary[randomNum];
}

function initializeTiles() {
  for (let currRowNum = 0; currRowNum < blockHeight; currRowNum++) {
    for (let colNum = 0; colNum < blockWidth; colNum++) {
      let tile = document.createElement('input');
      tile.id = currRowNum.toString() + '-' + colNum.toString();
      tile.maxLength = 1;
      tile.classList.add('game__tile');
      tile.value = '';
      tile.disabled = currRowNum !== 0;
      gamePlace.appendChild(tile);
    }
  }

  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile) => {
    tile.addEventListener('input', () => {
      gameCheck.disabled = checkEmptyInputs();
    });
  });
}

function checkEmptyInputs() {
  for (let colNum = 0; colNum < blockWidth; colNum++) {
    let currTile = document.getElementById(
      currRow.toString() + '-' + colNum.toString()
    );
    if(currTile) {
      if (currTile.value.length < 1) {
        return true;
      }
    }
  }
  return false;
}

function checkWordInDictionary() {
  let word = '';
  for (let colNum = 0; colNum < blockWidth; colNum++) {
    let currTile = document.getElementById(
      currRow.toString() + '-' + colNum.toString()
    );
    word += currTile.value;
  }

  return dictionary.includes(word);
}

function reloadTiles() {
  for (let colNum = 0; colNum < blockWidth; colNum++) {
    let currTile = document.getElementById(
      currRow.toString() + '-' + colNum.toString()
    );
    currTile.value = '';
  }
}

function updateGame() {
  let correct = 0;
  for (let colNum = 0; colNum < blockWidth; colNum++) {
    let currTile = document.getElementById(
      currRow.toString() + '-' + colNum.toString()
    );
    let letter = currTile.value.toLowerCase();

    if (word[colNum] === letter) {
      currTile.classList.add('success');
      correct++;
    } else if (word.includes(letter)) {
      currTile.classList.add('warning');
    } else {
      currTile.classList.add('none');
    }

    if (correct === blockWidth) {
      alert('Congratulations! You won.');
      stopGame();
    }

    currTile.disabled = true;
  }

  if (correct !== blockWidth && currRow === blockHeight - 1) {
    alert('Game over.');
    stopGame();
  }
}

function stopGame() {
  gameWin = true;
  gameCheck.disabled = true;
}

function openNextTiles() {
  if (!gameWin) {
    for (let colNum = 0; colNum < blockWidth; colNum++) {
      let currTile = document.getElementById(
        currRow.toString() + '-' + colNum.toString()
      );
      currTile.disabled = false;
    }
  }
}

function handleReset() {
  currRow = 0;
  word = getRandomWord();
  gameWin = false;

  for (let currRowNum = 0; currRowNum < blockHeight; currRowNum++) {
    for (let colNum = 0; colNum < blockWidth; colNum++) {
      let tile = document.getElementById(
        currRowNum.toString() + '-' + colNum.toString()
      );
      tile.value = '';
      tile.classList.remove('success', 'warning', 'none');
      tile.disabled = currRowNum !== 0;
    }
  }
}

function handleCheck() {
  if (!checkEmptyInputs()) {
    if (checkWordInDictionary()) {
      updateGame();
      currRow++;
      openNextTiles();
    } else {
      alert('Not in word list');
      reloadTiles();
    }
  } else {
    alert('Print word');
  }
}

window.addEventListener('load', initializeTiles);
gameCheck.addEventListener('click', handleCheck);
gameReset.addEventListener('click', handleReset);
