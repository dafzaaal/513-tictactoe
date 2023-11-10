/* 
    Course: SENG 513
    Name and UCID: Dawood Afzaal (UCID: 30063067)
    Date: Oct. 16th, 2023
*/

// JS script loads HTML body
window.addEventListener('DOMContentLoaded', () => {

    // Initialize variables
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    // initialize variables for board, current player and game state
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

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

    const updateBoard =  (index) => {
      board[index] = currentPlayer;
   }

   

    const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
  }


  tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});


const resetBoard = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  announcer.classList.add('hide');

  if (currentPlayer === 'O') {
      changePlayer();
  }

  tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
  });
}






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


