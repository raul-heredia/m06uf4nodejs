window.onload = () => {
    scoreLabel = document.getElementById("score");
    torn = document.getElementById('torn');
    blackBackground = document.getElementById("black");
    disclayer = document.getElementById("disclayer");
    finishBtn = document.getElementById("finishBtn");
    logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener('click', logout);
    blackBackground.style.width = cellWidth * 8 + (gap * 9) + "px";
    blackBackground.style.height = cellWidth * 8 + (gap * 9) + "px";
    drawGreenSquares();
    drawDiscs();
}

var blackBackground;
var gap = 3;
var cellWidth = 80;
var disclayer;
var turn = 1;
var score;
var ones, twos = 0;
var marcador;
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
    fetch('recarregarTauler')
        .then(response => response.json())
        .then(fitxes => {
            console.table(fitxes);
            discs = fitxes;
            drawDiscs();
        })
}, 3000);

const recarregaTorn = setInterval(() => {
    fetch('recarregarTorn')
        .then(response => response.json())
        .then(data => {
            console.log("turn", data);
            turn = data;
        })
}, 3000);

//clearInterval(recarregaTauler);

function actualitzarPartida() {
    fetch(`actualitzarPartida?tauler=${JSON.stringify(discs)}&torn=${JSON.stringify(turn)}&negres=${ones}&blancs=${twos}`)
        .then(response => response.json())
        .then(marcador => {
            scoreLabel.innerHTML = `Jugador 1: ${marcador.marcadorNegre} || Jugador 2: ${marcador.marcadorBlanc}`;
        })
}

function logout() {
    fetch('logout')
        .then((resposta) => {
            console.log(resposta)
            clearInterval(recarregaTauler);
            clearInterval(recarregaTorn);
            window.location.href = "http://localhost:8888/login";
        });
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
        if (turn == 1) turn = 2;
        else turn = 1;
        drawDiscs();
        redrawScore();
        actualitzarPartida();
    }
}
function redrawScore() {
    ones = 0;
    twos = 0;
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 1) ones += 1;
            else if (value == 2) twos += 1;
        }
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
            //console.log("value:", value);
            if (value != 0) {
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