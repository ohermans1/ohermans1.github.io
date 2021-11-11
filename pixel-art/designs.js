//// Variables
// Creates variable for table
var pixelCanvas = document.querySelector("#canvas");
// Creates variable for button
var form = document.querySelector("#button");
// Creates variable for colour picker
var colorPicker = document.querySelector("#colorPicker");
// Creates a color variable
var colorInput = "#4bd34f";

// This function creates a table based on the height and width entered by the user, it then return the table.
function makeGrid(height, width) {
  // Creates a document fragment
  var grid = document.createDocumentFragment();
  // Creates rows of table
  for (x = 1; x <= height; x++) {
    var row = document.createElement("tr");
    grid.appendChild(row);
    //Creates columns of table
    for (y = 1; y <= width; y++) {
      var column = document.createElement("td");
      row.appendChild(column);
    }
  }
  return grid;
}

//// Takes inputs and creates the grid
form.addEventListener("click", function takeInputs() {
  // Clears any old table content
  pixelCanvas.innerHTML = "";
  pixelCanvas.style = "";
  // Puts values of inputs into variables
  var widthInput = document.querySelector("#widthPicker").value;
  var heightInput = document.querySelector("#heightPicker").value;
  // Calls makeGrid function with new input value variables
  pixelCanvas.appendChild(makeGrid(heightInput, widthInput));
  document.querySelector(".hidden").style.display = "block";
});

// Saves the color into the color variable
colorPicker.addEventListener("input", function () {
  colorInput = document.querySelector("#colorPicker").value;
  colorPicker.style.backgroundColor = colorInput;
});

// Color the pixels
pixelCanvas.addEventListener("click", function colorPixels(e) {
  var cell = e.target;
  if (cell.tagName === "TD") {
    cell.style.backgroundColor = colorInput;
    cell.style.border = colorInput;
  } else {
    return;
  }
});
