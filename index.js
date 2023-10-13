/* 
    Course: SENG 513
    Name and UCID: Dawood Afzaal (UCID: 30063067)
    Date: Oct. 16th, 2023
*/

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



          * Next we need some helper methods to handle some in game checking/updating the game

            1. the first would be a function which when given a tile is used to check if that tile is empty which will be used to validate a user input
            2. the next would be a function which updates the board w/ the player symbol
            3. the third helper function would be used to change the current player display text so if the game starts on player X's turn, it'll say that on the website
               but after player X makes a move, the text should change to "Player O'x Turn"
            4. the fourth function announces which player has won
            5. the next function would update the score count, so if player X won, increment their total wins +1, vis versa for Player O and also in the event it ties


    })


*/


