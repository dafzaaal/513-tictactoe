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
  const announcer = document.querySelector('.announcer');
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


/* 

  * this is where all the code goes, this line (line #12) ensures the code inside runs ONLY when after the browser loads the HTML
  window.addEventListener('DOMContentLoaded', () +> {

      * initialize variables and grab the HTML DOM elements using document.querySelector to get an HTML element based on a class name or id

      ex.

      const tiles = Array.from(document.querySelector('.tile')); ---> this line grabs all HTML elements with the classname of tile
      -- add remaining variables for player display, the reset button and the announcer --


      * initialize more variables, some text variables for the winning text which should be displayed (ex. Player X Won!, etc.), as well as an
        empty array with 9-spaces as we will use this to store the symbols
      
      ex.

      const PX_WINS = "Player X Won!";
      const PO_WINS = "Player O Won!";
      const Tie = "It's a Tie!";
      
      * initialize remaining variables for board, should be 3x3 so an array of size nine as well as a current player value, the game always starts with X
        and a boolean flag in charge of checking if the game is still active, this will be used to check if either player has won

      


      * Next, we need to grab all possible winning conditions, since the board is 3x3 and we are using an array of size nine so it would look like...

        tiles = ['', '', '', '', '', '', '', '', ''];

        so the board would look like this in a 3x3 manner w/ their respective indexes...

        tiles = [
          '0', '1', '2',
          '3', '4', '5',
          '6', '7', '8',
        ] 

        next, we would need to store all possible win conditions inside an 2D array (which index would lead to a win if all three had a three-in-a-row)

        ex.

        const winConditions = [
          [0, 1, 2],
          ...
        ]



        --- Defining Helper Methods ---

          * Next we need some helper methods to handle some in game checking/updating the game

          1. the first would be a function which when given a tile is used to check if that tile is empty which will be used to validate a user input
          2. the next would be a function which updates the board w/ the player symbol
          3. the third helper function would be used to change the current player display text so if the game starts on player X's turn, it'll say that on the website
             but after player X makes a move, the text should change to "Player O'x Turn"
          4. the fourth function announces which player has won using either if-statements or switch-case statements for if Player X wins, or Player O wins, or if its a tie 
          5. the next function would update the score count, so if player X won, increment their total wins +1, vis versa for Player O and also in the event it ties
          6. this function will validate the results, after every play, we'll call this function which will loop through the array of tiles and checks if a three-in-a-col/row/diagonal
             is found and sets the appropriate variables (ex. set player won text to whoever won, set game end flag, etc.)
          7. the next function which will take a tile and the array index, this function will  be used to update the array with the players symbol, this function will be called when a player
             makes a turn, it will use the previous helper method which we defined where it takes a tile and checks if that tile is empty, if it is, we know it can be a played tile and we update 
             both the innerHTML of that specific tile to the player's symbol and also update the array, to make sure this works, make sure you add an event listener for ALL TILES
          8. the last helper method would be used to reset the board, inside the method just reset all values back to their default state EXCEPT the scoreboard 

  })


*/

