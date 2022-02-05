window.onload = main;

function main() {
    const taula = document.getElementById('taula');
    let turn = 1;
    let discs = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]];

    function generaTaula() {
        taula.innerHTML = '';
        for (let row = 0; row < discs.length; row++) {
            let fila = document.createElement('tr'); // creem un element TR
            for (let column = 0; column < discs[row].length; column++) {
                let casella = document.createElement('td');
                let fitxa = document.createElement('div');
                casella.classList = "fons";
                if (discs[row][column] == 1) {
                    fitxa.classList = "blanc";
                    casella.appendChild(fitxa);
                } else if (discs[row][column] == 2) {
                    fitxa.classList = "negre";
                    casella.appendChild(fitxa);
                }
                casella.setAttribute('id', `${row}${column}`)
                fila.appendChild(casella);
            }
            taula.appendChild(fila);
        }
    }

    function casellaClicada(event) {
        row = event.target.id[0];
        column = event.target.id[1];

        if (row && column) {
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
                generaTaula();
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
        return affectedDiscs;

    }

    function flipDiscs(affectedDiscs) {
        for (var i = 0; i < affectedDiscs.length; i++) {
            var spot = affectedDiscs[i];
            if (discs[spot.row][spot.column] == 1) {
                discs[spot.row][spot.column] == 2;
            } else {
                discs[spot.row][spot.column] == 1;
            }
        }
    }


    // Listener

    taula.addEventListener('click', casellaClicada, false)

    generaTaula();
}



