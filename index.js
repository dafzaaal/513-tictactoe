/* 
    Course: SENG 513
    Name and UCID: Dawood Afzaal (UCID: 30063067)
    Date: Nov. 13th, 2023
*/

// JS script loads HTML body
window.addEventListener('DOMContentLoaded', () => {

  // Initialize variables
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.getElementById('announcer');
  let gameStatus = false;

  // initialize variables for board, current player and game state
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';

  // Winning conditions
  const PX_WINS = "Player X Won!";
  const PO_WINS = "Player O Won!";
  const Tie = "It's a Tie!";

  // show all possible win conditions
  const winConditions = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left col
      [1, 4, 7], // middle col
      [2, 5, 8], // right col
      [0, 4, 8], // left diagonal
      [2, 4, 6]  // right diagonal
  ];

  // getting the instructions on how to play the game in the event a player clicks on the how to play button
  document.getElementById('how-to-play-btn').addEventListener('click', () => {
      let instructions = document.getElementById('instructions');
      instructions.style.display = 'block';
  });

  // otherwise if the user has opened the how to play pop up, when the close button is clicked the pop up closes
  document.getElementById('close-btn').addEventListener('click', () => {
      let instructions = document.getElementById('instructions');
      instructions.style.display = 'none';
  });

  //when the user clicks on the play button, the game begins
  document.getElementById('play-btn').addEventListener('click', () => {

    // show which player's turn it is
    let player = document.getElementById('display-player');
    player.style.display = "block";

    // after the player has clicked play, toggle the hover effects for the x/o tiles
    let board = document.querySelector('.container');
    board.classList.toggle('active');

    // set the game flag to true to show that the games begun
    gameStatus = true;
  });

  
  // when the user clicks on the reset button, the game resets
  document.getElementById('reset').addEventListener('click', () => {

    // reset the board
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus = true;

    // reset the tiles
    tiles.forEach(tile => {
      tile.classList.remove('x', 'o', 'filled');
      tile.textContent = '';
    });

    // reset the announcer
    announcer.style.display = 'none';

    // reset the current player
    currentPlayer = 'X';

    // reset the player display
    let player = document.getElementById('display-player');
    player.textContent = "Player " + currentPlayer + "\'s Turn";
    player.style.color = currentPlayer === 'X' ? 'var(--playerX)' : 'var(--playerO)';

    // reset the tie announcer
    let announceTie = document.getElementById('announce-tie');
    announceTie.style.display = 'none';

    // reset the hover effect
    updateHoverSymbol();
  });


  /* 
    helper method which places mark on board, this method is called when a player clicks on a tile
    it places the current player's symbol on the board and also updates the array and applies 
    the appropriate css class to the tile
  */

  function placeMark(event) {

    // checking if game is not active, if not, return
    if(!gameStatus) return;

    let player = document.getElementById('display-player');
    const tile = event.target;
    if(tile.textContent === '') {
      tile.textContent = currentPlayer;
      tile.classList.remove('x', 'o');
      tile.classList.add(currentPlayer.toLowerCase());
      tile.classList.add('filled');
      updateBoard(tile.getAttribute('index'), currentPlayer);


      // check if the current player has won or if the game is a tie
      if(checkWin(currentPlayer)) {
        announceWinner(currentPlayer);
        updateScoreBoard(currentPlayer);
      }
      else if(checkTie()) {
        let score = document.querySelector('.tie-count');
        score.textContent = parseInt(score.textContent) + 1;
        announceTie();
      }

      // update the current player and the hover symbol effect
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      player.textContent = "Player " + currentPlayer + "\'s Turn";
      player.style.color = currentPlayer === 'X' ? 'var(--playerX)' : 'var(--playerO)';
      updateHoverSymbol();
    }
  }

  // helper function which loops through the board array and checks if a tie has occured
  function checkTie() {
    if(board.every(tile => tile !== '')) {
      gameStatus = false;
      return true;
    }
    return false;
  }

  function checkWin(player) {
    // Iterate over all possible win conditions and check if any are met
    for (let condition of winConditions) {
        // Destructure the indexes for readability
        let [a, b, c] = condition;

        // Check if the board at these indexes has the same player symbol
        if (board[a] === player && board[b] === player && board[c] === player) {
            gameStatus = false; // Game is over
            return true; // Win condition met
        }
    }
    return false; // No win condition met
}


function updateScoreBoard(player) {
  // update the scoreboard

  // if the player is X then increment the X scoerboard by 1
  if(player === 'X') {
    let score = document.querySelector('.player-x-win-count');
    score.textContent = parseInt(score.textContent) + 1;
  }
  // else if the player is O then increment the scoreboard by 1
  else if(player === 'O') {
    let score = document.querySelector('.player-o-win-count');
    score.textContent = parseInt(score.textContent) + 1;
  }
}



  // quick helper method which updates the board array w/ the current players symbol
  const updateBoard = (index, player) => {
    board[index] = player;
  }

  /*
    helper function called when a player wins, takes the currents player symbol and displays it on the screen
  */
  function announceWinner(player) {
    const announceSpan = document.querySelector('#announcer span');
    announceSpan.textContent = player;
    announceSpan.style.color = player === 'X' ? 'var(--playerX)' : 'var(--playerO)';
    let announcer = document.getElementById('announcer');
    announcer.style.display = 'block';
  }

  // function which announces a tie
  function announceTie() {
    const announceTie = document.getElementById('announce-tie');
    announceTie.style.display = 'block';
  }



  /* 
    helper method which updates the hover symbol effect, this method is called when a player makes a move
    it updates the current player and also the hover symbol effect matches the current player's symbol
  */
  function updateHoverSymbol() {
    document.documentElement.style.setProperty('--currentPlayerColor', currentPlayer === 'X' ? 'var(--playerX)' : 'var(--playerO)');

    // set hover text content to current player symbol
    tiles.forEach(tile => {
      if(!tile.textContent.trim())
        tile.setAttribute('data-hover', currentPlayer);
    });
  }

  // call initialize initial hover effect
  updateHoverSymbol();

  /* 
    for-each loop which iterates through all tiles and adds an event listener to each tile
    ang places a mark on the board of the current players symbol
  */
  tiles.forEach(tile => {
    if(currentPlayer === 'X') {
      tile.addEventListener('click', placeMark);
    }
  });




});


