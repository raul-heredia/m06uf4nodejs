var blackBackground;
var gap = 3;
var cellWidth = 80;
var disclayer;
var turn = 1;
var score;
var xhrDiscs = new XMLHttpRequest();
var xhrTorn = new XMLHttpRequest();
var discs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

const recarregaTauler = setInterval(function () {
    xhrDiscs.onreadystatechange = function () {
        if (xhrDiscs.readyState == 4) {
            discs = JSON.parse(xhrDiscs.responseText);
            drawDiscs();
        }
    };
    xhrDiscs.open("GET", "recarregarTauler", true);
    xhrDiscs.send(null);
}, 5000);

const recarregaTorn = setInterval(() => {
    xhrTorn.onreadystatechange = () => {
        if (xhrTorn.readyState == 4) {
            turn = parseInt(xhrTorn.responseText);
        }
    };
    xhrTorn.open("GET", "recarregarTorn", true);
    xhrTorn.send(null);
}, 5000);

//clearInterval(recarregaTauler); // thanks @Luca D'Amico


window.onload = () => {
    scoreLabel = document.getElementById("score");
    blackBackground = document.getElementById("black");
    disclayer = document.getElementById("disclayer");
    blackBackground.style.width = cellWidth * 8 + (gap * 9) + "px";
    blackBackground.style.height = cellWidth * 8 + (gap * 9) + "px";
    drawGreenSquares();
    drawDiscs();
}
function drawGreenSquares() {
    //DIBUJA LAS CUADRICULAS DEL TABLERO
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var GreenSquare = document.createElement("div");
            GreenSquare.style.position = "absolute";
            GreenSquare.style.width = cellWidth + "px";
            GreenSquare.style.height = cellWidth + "px";
            GreenSquare.style.backgroundColor = "green";
            GreenSquare.style.left = (cellWidth + gap) * column + gap + "px";
            GreenSquare.style.top = (cellWidth + gap) * row + gap + "px";
            GreenSquare.setAttribute("onclick", "clickedSquare(" + row + "," + column + ")");

            blackBackground.appendChild(GreenSquare);
        }
    }
}
function clickedSquare(row, column) {

    //MIRA SI HAY UNA FICHA PUESTA
    if (discs[row][column] != 0) {
        return;
    }

    if (canClickSpot(row, column) == true) {
        var affectedDiscs = getAffectedDiscs(row, column);
        flipDiscs(affectedDiscs);
        discs[row][column] = turn;
        drawDiscs();
        redrawScore();
    }
}
function redrawScore() {
    var ones = 0;
    var twos = 0;
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 1) ones += 1;
            else if (value == 2) twos += 1;
        }
        scoreLabel.innerHTML = "Black : " + ones + " White : " + twos;
    }
}
function canClickSpot(row, column) {
    var affectedDiscs = getAffectedDiscs(row, column);
    if (affectedDiscs.length == 0) return false;
    else return true;
}
function getAffectedDiscs(row, column) {
    //COMPRUEBA HACIA LA DERECHA
    var affectedDiscs = [];
    var couldBeAffected = [];
    var columnIterator = column;
    while (columnIterator < 8) {
        columnIterator += 1;
        var valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: row, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //COMPRUEBA HACIA LA IZQUIERDA
    var couldBeAffected = [];
    var columnIterator = column;
    while (columnIterator > 0) {
        columnIterator -= 1;
        var valueAtSpot = discs[row][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: row, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }

    //COMPRUEBA HACIA ABAJO
    var couldBeAffected = [];
    var rowIterator = row;
    while (rowIterator > 0) {
        rowIterator -= 1;
        var valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: column };
            couldBeAffected.push(discLocation);
        }
    }

    //COMPRUEBA HACIA ARRIBA
    var couldBeAffected = [];
    var rowIterator = row;
    while (rowIterator < 7) {
        rowIterator += 1;
        var valueAtSpot = discs[rowIterator][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: column };
            couldBeAffected.push(discLocation);
        }
    }
    //COMPRUEBA HACIA DIAGONAL-ABAJO-DERECHA
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator < 7 && columnIterator < 7) {
        rowIterator += 1;
        columnIterator += 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }
    //COMPRUEBA HACIA DIAGONAL-ABAJO-IZQUIERDA
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator < 7 && columnIterator > 0) {
        rowIterator += 1;
        columnIterator -= 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }
    //COMPRUEBA HACIA DIAGONAL-ARRIBA-IZQUIERDA
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator > 0 && columnIterator > 0) {
        rowIterator -= 1;
        columnIterator -= 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }
    //COMPRUEBA HACIA DIAGONAL-ARRIBA-DERECHA
    var couldBeAffected = [];
    var rowIterator = row;
    var columnIterator = column;
    while (rowIterator > 0 && columnIterator < 7) {
        rowIterator -= 1;
        columnIterator += 1;
        var valueAtSpot = discs[rowIterator][columnIterator];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                affectedDiscs = affectedDiscs.concat(couldBeAffected);
            }
            break;
        } else {
            //PILLA LA LOCALIZACION QUE ESTA EN EL WHILE
            var discLocation = { row: rowIterator, column: columnIterator };
            couldBeAffected.push(discLocation);
        }
    }
    return affectedDiscs;

}
function flipDiscs(affectedDiscs) {
    for (var i = 0; i < affectedDiscs.length; i++) {
        var spot = affectedDiscs[i];
        if (discs[spot.row][spot.column] == 1) {
            discs[spot.row][spot.column] = 2;
        } else {
            discs[spot.row][spot.column] = 1;
        }
    }
}
function drawDiscs() {
    disclayer.innerHTML = "";
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 0) {

            } else {
                var disc = document.createElement("div");
                disc.style.position = "absolute";
                disc.style.width = cellWidth - 4 + "px";
                disc.style.height = cellWidth - 4 + "px";
                disc.style.borderRadius = "50%";
                disc.style.left = (cellWidth + gap) * column + gap + 2 + "px";
                disc.style.top = (cellWidth + gap) * row + gap + 2 + "px";

                if (value == 1) {
                    disc.style.backgroundColor = "black";
                }
                if (value == 2) {
                    disc.style.backgroundColor = "white";
                }
                disclayer.appendChild(disc);
            }
        }
    }
}