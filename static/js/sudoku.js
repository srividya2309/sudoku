function init() {
  var sudoku = document.getElementsByClassName("sudoku")[0];

  for (let i = 0; i < 9; i++) {
    var row = document.createElement("tr");
    row.classList.add("row");
    if ((i + 1) % 3 == 0 && i < 8) {
      row.classList.add("row-divider");
    }
    for (let j = 0; j < 9; j++) {
      var cell = document.createElement("td");
      cell.classList.add("cell");
      if ((j + 1) % 3 == 0 && j < 8) {
        cell.classList.add("cell-divider");
      }

      var input = document.createElement("input");
      input.classList.add("cell-input");
      input.classList.add("t" + i + "x" + j);
      input.type = "text";
      input.maxLength = "1";
      input.oninput = function () {
        this.value = this.value.replace(/[^1-9]/g, "");
        checkSame(this, j, i);
      };
      input.onclick = function () {
        checkSame(this, j, i);
      };

      cell.append(input);

      row.append(cell);
    }
    sudoku.append(row);
    // console.log(sudoku);
  }

  
}

function checkSame(input, currentColumn, currentRow) {
  var rows = document.getElementsByClassName("row");
  for (let i = 0; i < rows.length; i++) {
    var row = document.getElementsByClassName("row")[i];
    for (let j = 0; j < row.childNodes.length; j++) {
      if (
        input.value == row.childNodes[j].childNodes[0].value &&
        input.value != ""
      ) {
        if (
          (currentColumn == j && currentRow != i) ||
          (currentColumn != j && currentRow == i)
        ) {
          row.childNodes[j].childNodes[0].style.background =
            "rgb(216, 219, 230)";
          let currentY = document.getElementsByClassName("row")[currentRow];
          // currentY.childNodes[currentColumn].childNodes[0].style.background = "rgb(216, 219, 230)";
        } else if (
          Math.floor(currentColumn / 3) == Math.floor(j / 3) &&
          Math.floor(currentRow / 3) == Math.floor(i / 3) &&
          currentRow != i &&
          currentColumn != j
        ) {
          row.childNodes[j].childNodes[0].style.background =
            "rgb(216, 219, 230)";
          let currentY = document.getElementsByClassName("row")[currentRow];
          // currentY.childNodes[currentColumn].childNodes[0].style.background = "rgb(255 153 153)";
        } else {
          row.childNodes[j].childNodes[0].style.background =
            "rgb(216, 219, 230)";
        }
      } else {
        row.childNodes[j].childNodes[0].style.background = "white";
      }
    }
  }
}

function clear() {
  var rows = document.getElementsByClassName("row");
  for (var i = 0; i < rows.length; i++) {
    var row = document.getElementsByClassName("row")[i];
    for (var j = 0; j < row.childNodes.length; j++) {
      row.childNodes[j].childNodes[0].value = "";
      row.childNodes[j].childNodes[0].classList.replace(
        "cell-generated",
        "cell-input"
      );
      row.childNodes[j].childNodes[0].readOnly = false;
      row.childNodes[j].childNodes[0].style.background = "white";
    }
  }
}
// var trial = []
function generate() {
  clear();
  var bord = [];
  for (var y = 0; y < 9; y++) {
    bord.push([]);
    for (var x = 0; x < 9; x++) {
      bord[y].push(0);
    }
  }
  createRandomSolution(bord);
  // console.log(bord);
  removeFromBord(bord, 45);
  // console.log(trial);

  //adds bord to the html bord.
  var rows = document.getElementsByClassName("row");
  for (var i = 0; i < rows.length; i++) {
    var row = document.getElementsByClassName("row")[i];
    for (var j = 0; j < row.childNodes.length; j++) {
      if (bord[i][j] == 0) {
        continue;
      }
      row.childNodes[j].childNodes[0].value = bord[i][j];
      row.childNodes[j].childNodes[0].classList.replace(
        "cell-input",
        "cell-generated"
      );
      row.childNodes[j].childNodes[0].readOnly = true;
    }
  }
  // console.log(bord);
}

//removes values from a solved bord and makes sure that the bord still only has one solution.
function removeFromBord(bord, amount) {
  // console.log(bord);
  while (amount > 0) {
    var x = Math.floor(Math.random() * 9);
    var y = Math.floor(Math.random() * 9);
    if (bord[y][x] != 0) {
      var tempbord = [];
      for (var i = 0; i < 9; i++) {
        tempbord.push([]);
        for (var j = 0; j < 9; j++) {
          tempbord[i].push(bord[i][j]);
        }
      }
      tempbord[y][x] = 0;

      getSolutionCount(tempbord);
      if (solutionCount == 1) {
        amount--;
        bord[y][x] = 0;
      }
    }
  }
}

//solves the current bord.
function solve() {
  var bord = [];
  var rows = document.getElementsByClassName("row");
  for (var i = 0; i < rows.length; i++) {
    bord.push([]);
    var row = document.getElementsByClassName("row")[i];
    for (var j = 0; j < row.childNodes.length; j++) {
      if (row.childNodes[j].childNodes[0].value == "") {
        bord[i].push(0);
      } else {
        var value = parseInt(row.childNodes[j].childNodes[0].value, 10);
        bord[i].push(value);
      }
    }
  }
  if (isSolvable(bord) == 1) {
    var rows = document.getElementsByClassName("row");
    for (var i = 0; i < rows.length; i++) {
      var row = document.getElementsByClassName("row")[i];
      for (var j = 0; j < row.childNodes.length; j++) {
        if (bord[i][j] == 0) {
          continue;
        }
        row.childNodes[j].childNodes[0].value = bord[i][j];
      }
    }
  } else {
    console.log("could not solve sudoku");
    return "False";
  }
  // trial = bord
  //  .log(bord);
}

function possible(x, y, num, bord) {
  //check vertical.
  for (var i = 0; i < bord.length; i++) {
    if (i == y) {
      continue;
    }
    if (bord[i][x] == num) {
      return false;
    }
  }
  //check horizontal.
  for (var i = 0; i < bord[y].length; i++) {
    if (i == x) {
      continue;
    }
    if (bord[y][i] == num) {
      return false;
    }
  }
  //finding the column and row the point is in.
  var xColumn = Math.floor(x / 3);
  var yColumn = Math.floor(y / 3);
  for (var i = yColumn * 3; i < yColumn * 3 + 3; i++) {
    for (var j = xColumn * 3; j < xColumn * 3 + 3; j++) {
      if (i == y && j == x) {
        continue;
      }
      if (bord[i][j] == num) {
        return false;
      }
    }
  }
  return true;
}

function isSolvable(bord) {
  if (isValid(bord) == false) {
    return 2;
  }
  //loop through grid.
  for (var y = 0; y < bord.length; y++) {
    for (var x = 0; x < bord[y].length; x++) {
      if (bord[y][x] != 0) {
        continue;
      }
      for (var n = 1; n < 10; n++) {
        if (possible(x, y, n, bord)) {
          bord[y][x] = n;

          var status = isSolvable(bord);
          if (status == 1) {
            return 1;
          } else if (status == 2) {
            bord[y][x] = 0;
          }
        }
      }
      return 2;
    }
  }
  return 1;
}

var solutionCount = 0;
function getSolutionCount(bord, depth = 0) {
  if (depth == 0) {
    solutionCount = 0;
  }
  if (isValid(bord) == false) {
    return 2;
  }
  //loop through grid.
  for (var y = 0; y < bord.length; y++) {
    for (var x = 0; x < bord[y].length; x++) {
      if (bord[y][x] != 0) {
        continue;
      }
      for (var n = 1; n < 10; n++) {
        if (possible(x, y, n, bord)) {
          bord[y][x] = n;

          var status = getSolutionCount(bord, depth + 1);

          bord[y][x] = 0;
        }
      }
      /*if(depth == 0){
                return 2;
            }*/
      return 2;
    }
  }
  solutionCount++;
  return 1;
}

//creates a complete sudoku.
function createRandomSolution(bord) {
  if (isValid(bord) == false) {
    return 2;
  }

  for (var y = 0; y < bord.length; y++) {
    for (var x = 0; x < bord[y].length; x++) {
      if (bord[y][x] != 0) {
        continue;
      }
      var numbers = getRandomNumberList();
      for (var n = 0; n < 9; n++) {
        if (possible(x, y, numbers[n], bord)) {
          bord[y][x] = numbers[n];

          var status = createRandomSolution(bord);
          if (status == 1) {
            return 1;
          } else if (status == 2) {
            bord[y][x] = 0;
          }
        }
      }
      return 2;
    }
  }
  return 1;
}

function getRandomNumberList() {
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (var i = 0; i < numbers.length; i++) {
    var num = numbers[i];
    var num2 = Math.floor(Math.random() * 9);
    numbers[i] = numbers[num2];
    numbers[num2] = num;
  }
  return numbers;
}

function isValid(bord) {
  for (var y = 0; y < bord.length; y++) {
    for (var x = 0; x < bord[y].length; x++) {
      if (bord[y][x] == 0) {
        continue;
      }
      if (possible(x, y, bord[y][x], bord) == false) {
        return false;
      }
    }
  }
  return true;
}

function getFinishedGrid() {
  var fGrid = new Array(9);
  for (var i = 0; i < 9; i++) {
    fGrid[i] = new Array(9);
    for (var j = 0; j < 9; j++) {
      fGrid[i][j] = document.getElementsByClassName("t" + i + "x" + j)[0].value;
    }
  }
  return fGrid;
}

//-----------Timer-------------



