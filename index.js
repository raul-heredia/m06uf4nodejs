window.onload = main;

function main() {
    console.log("Hello World!")
    const taula = document.getElementById('taula');
    let tauler = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0], [0, 0, 0, 2, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];

    for (let c = 0; c < tauler.length; c++) {
        let fila = document.createElement('tr'); // creem un element TR
        for (let i = 0; i < tauler[c].length; i++) {
            let casella = document.createElement('td');
            let fitxa = document.createElement('div')
            casella.classList = "fons"
            if (tauler[c][i] == 1) {
                fitxa.classList = "blanc";
                casella.appendChild(fitxa);
                console.log("Blanc");
            } else if (tauler[c][i] == 2) {
                fitxa.classList = "negre";
                casella.appendChild(fitxa);
                console.log("Negre");
            }
            fila.appendChild(casella);
        }
        taula.appendChild(fila);
    }
}



