document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const StartBtn = document.querySelector('#start-button');
  const width = 10;

  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1,width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width,width + 1, width + 2,width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino,iTetromino];
  let currentPosition = 4;
  let current;

  // Randomly select a Tetromino and its first rotation
  // using Math.random, .length, Math.floor

  generateShape = () => {
    let randTetriminoIndex = Math.floor(Math.random() * theTetrominoes.length);
    let randTetrimino = theTetrominoes[randTetriminoIndex];
    let randPositionIndex = Math.floor(Math.random() *  randTetrimino.length);
    current = randTetrimino[randPositionIndex];
  }

  generateShape();
  //let current = theTetrominoes[0][0];

  // Draw the Tetromino
  const draw = () => {
    current.forEach(i => {
      squares[currentPosition  +  i].classList.add('tetromino');
    });
  }
  draw();
  // Undraw the Tetrominoes
  const undraw = () => {
    current.forEach(i => {
      squares[currentPosition  +  i].classList.remove('tetromino');
    });
  }

  // Make the Tetromino move down every second
  timerId = setInterval(moveDown, 1000);

  // moveDown function
  function moveDown () {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Freeze Tetromino shapes when they can no longer move move down
  function freeze () {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));
      // start a new Tetromino falling
      generateShape();
    }
  }
})
