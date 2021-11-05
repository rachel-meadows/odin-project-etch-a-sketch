// Constants
const container = document.querySelector('#container');
const colorChoiceOption = document.getElementsByName('color');
const opacityChoiceOption = document.getElementsByName('opacity');
let gridSize = 16;
let opacityChoice = 1;
let colorChoice = "1, 1, 1, ";
let colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`;

function makeGrid (width, height) {
    for (i = 0; i < height; i++){
        let row = document.createElement('div'); // Make new element div
        container.appendChild(row);
        row.classList.add('gridRow');
        for (x = 0; x < width; x++) {
            let cell = document.createElement('div'); // Make new element div
            row.appendChild(cell);
            cell.classList.add('gridSquare');
        }
    }
    var gridRows = document.querySelectorAll(".gridSquare");
    var gridSquares = document.querySelectorAll(".gridSquare");
    return [gridRows, gridSquares];
}

function applyHoverPen(gridSquares) {
    gridSquares.forEach((gridSquare) => {
        let cellCount = 0;
        // This handler will be executed every time the cursor is moved over a different list item
        gridSquare.addEventListener("mouseover", function( e ) {
            // Highlight the mouseover grid square
            cellCount += 0.1;
            e.target.style.backgroundColor = colorOpacityChoice;
            colorOpacityChoice = `rgba(${colorChoice + (opacityChoice + cellCount)})`;
        });
    });
}

function changeColor() {
    colorChoiceOption.forEach((option) => {
        // This handler will be executed every time the user clicks a different radio button
        option.addEventListener("click", function( e ) {
            opacityChoice = 1;
            colorChoice = option.value;
            colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`;
        });        
    });

    opacityChoiceOption.forEach((option) => {
        // This handler will be executed every time the user clicks a different radio button
        option.addEventListener("click", function( e ) {
            if (option.id == "fade") {
                opacityChoice = 0.1;
            } else {
                opacityChoice = 1;
            }
            colorOpacityChoice = `rgba(${colorChoice + opacityChoice})`;
        });        
    });
}

function clearGrid(gridSquares) {
    const clearGrid = document.querySelector('#clearGrid');
    clearGrid.addEventListener("click", function( e ) {
        colorOpacityChoice = `rgba(242, 252, 253, 1)`;
        gridSquares.forEach((gridSquare) => {
            gridSquare.style.backgroundColor = colorOpacityChoice;
        });
    });
}

function resizeGrid() {
    let slider = document.getElementById("myRange");
    let output = document.getElementById("gridSize");
    output.innerHTML = slider.value; // Display default slider value
    
    slider.oninput = function() {
        gridSize = this.value;
        output.innerHTML = this.value; // Display new slider value
        // Get rid of the old grid
        container.querySelectorAll('*').forEach(n => n.remove());
        // Make the new grid
        enterActiveState(gridSize);
    }
}

function enterActiveState (gridSize=16) {
    gridArray = makeGrid(gridSize, gridSize); // Width, height - so needn't be square if wanted later
    let gridRows = gridArray[0];
    let gridSquares = gridArray[1];
    applyHoverPen(gridSquares);
    clearGrid(gridSquares);
    resizeGrid();
    changeColor();
}

// Calling the functions!
enterActiveState();
