// Player variable
let activePlayer = 'X';
// Array of moves to determine win condition
let selectedSquares = [];

function placeXorO(squareNumber){
    // Check if a square has been selected
    // already
    if(!selectedSquares.some(element => element.includes(squareNumber))) {
        // Set variable to selected square number
        let select = document.getElementById(squareNumber)
        // Find whose turn it is and place the correct image
        if(activePlayer === 'X'){
            select.style.backgroundImage = 'url("img/o.png")';
        }
        // Only two options, so just an else statement works
        else{
            select.style.backgroundImage = 'url("img/x.png")';
        }
        // Add number and player type to array
        selectedSquares.push(squareNumber + activePlayer);
        // Make sure nobody has won yet, and if they have end the game
        checkWinConditions();
        // Swap the players after move has been made
        if(activePlayer === "X"){
            activePlayer = "O";
        }
        else{
            activePlayer = "X";
        }
        // Slightly different than what was shown, this works 
        // and doing it the other way didn't
        var audio = new Audio("./media/place.mp3");
        audio.play();
        // Checks to see if it is the computer's turn and if it 
        // is then to disable clicking
        if(activePlayer === "O"){
            disableClick();
            // Wait 1 second then play the computer move
            setTimeout(function () {computersTurn(); }, 1000);
        }
        // Makes sure move is valid at the end for the computer
        return true;
    }
    
}

function computersTurn(){
    // While loop condition
    let success = false;
    // Stores a random number later
    let pickASquare;
    // Will loop through until a good square is found
    while(!success){
        // Random number from 0 to 8
        pickASquare = String(Math.floor(Math.random() * 9));
        // If it has been chosen it will loop again, if not
        // then the move will be made
        if(placeXorO(pickASquare)){
            placeXorO(pickASquare);
            // end loop
            success = true;
        }
    }
}
// Parses the array to check for wins
function checkWinConditions(){
    // Large list of all possible win conditions first is the X
    if(arrayIncludes('0X', '1X', '2X')){ drawWinLine(50,100,558,100) }
    else if(arrayIncludes('3X', '4X', '5X')){ drawWinLine(50,304,558,304) }
    else if(arrayIncludes('6X', '7X', '8X')){ drawWinLine(50,508,558,508) }
    else if(arrayIncludes('0X', '3X', '6X')){ drawWinLine(100,50,100,558) }
    else if(arrayIncludes('1X', '4X', '7X')){ drawWinLine(304,50,304,558) }
    else if(arrayIncludes('2X', '5X', '8X')){ drawWinLine(508,50,508,558) }
    else if(arrayIncludes('6X', '4X', '2X')){ drawWinLine(100,508,510,90) }
    else if(arrayIncludes('0X', '4X', '8X')){ drawWinLine(100,100,520,520) }

    // Here is the computer win conditions

    if(arrayIncludes('0O', '1O', '2O')){ drawWinLine(50,100,558,100) }
    else if(arrayIncludes('3O', '4O', '5O')){ drawWinLine(50,304,558,304) }
    else if(arrayIncludes('6O', '7O', '8O')){ drawWinLine(50,508,558,508) }
    else if(arrayIncludes('0O', '3O', '6O')){ drawWinLine(100,50,100,558) }
    else if(arrayIncludes('1O', '4O', '7O')){ drawWinLine(304,50,304,558) }
    else if(arrayIncludes('2O', '5O', '8O')){ drawWinLine(508,50,508,558) }
    else if(arrayIncludes('6O', '4O', '2O')){ drawWinLine(100,508,510,90) }
    else if(arrayIncludes('0O', '4O', '8O')){ drawWinLine(100,100,520,520) }
    // If all squares have been played, audio will let you know
    else if(selectedSquares.length >= 9) {
        var audio = new Audio('./media/tie.mp3');
        audio.play();

        setTimeout(function () { resetGame();}, 1000);
    }

}
function arrayIncludes(squareA, squareB, squareC) {
    // Three constants to see if squares are selected
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);
    // if all three are already selected, then true is returned
    if(a === true && b === true && c === true){return true;}
}

function disableClick() {
    // Set clicking to none
    document.body.style.pointerEvents = 'none';
    // After a second it will be clickable again, when the
    // computer has made their move, should be a constant
    // set to a value at the top of the page to ensure that
    // the two are always in sync
    setTimeout(function() { document.body.style.pointerEvents = 'auto';}, 1000)
}

function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // create variable with canvas element
    const canvas = document.getElementById('win-lines');
    const c = canvas.getContext('2d');
    // Make two sets variables with the coordinates and some to be changed later
    let x1 = coordX1, y1 = coordY1, x2 = coordX2, y2 = coordY2, x = x1, y = y1;
    function animateLineDrawing() {
        // Creates a loop
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // Clear content from last iteration
        c.clearRect(0,0,608,608);
        //Start new path
        c.beginPath();
        // Starting point for line
        c.moveTo(x1, y1);
        // End point of line
        c.lineTo(x,y);
        // Set width and color of line
        c.lineWidth = 10;
        c.strokeStyle = '#000000'
        // Runs what we set up
        c.stroke();
        // Checks to see where we are at and if we aren't at the
        // end then it will add/subtract 10 to each until the animation needs
        // to stop
        if(x1 <= x2 && y1 <= y2){
            if (x < x2) { x+=10; }
            if (y < y2) { y+=10; }
            if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
        }
        if (x1 < x2 && y1 >= y2) {
            if (x < x2) { x+=10; }
            if (y > y2) { y-=10; }
            if (x >=x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }

    function clear() {
        // Start the animation
        const animationLoop = requestAnimationFrame(clear);
        // Clear the canvas
        c.clearRect(0, 0 , 608, 608);
        // Stop the animation
        cancelAnimationFrame(animationLoop);
    }

    // Things to end the game and acutally draw the line
    disableClick();
    var audio = new Audio("/media/winGame.mp3");
    audio.play();
    animateLineDrawing();
    setTimeout(function () { clear(); resetGame(); }, 1000)
}
// Clears everything out
function resetGame() {
    // Loop through all 9 id's and change their style back to blank
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i));
        square.style.backgroundImage = '';
    }
    selectedSquares = [];
}
