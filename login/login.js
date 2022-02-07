window.onload = main;



function main() {

    // Variables
    const loginBtn = document.getElementById('loginBtn');
    const selectPlayer = document.getElementById('selectJugador');
    const taula = document.getElementById('taula');
    let xhr = new XMLHttpRequest();
    // Funcions


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let topRecords = JSON.parse(this.response);
            generaTopRecords(topRecords);
        }
    };
    xhr.open("GET", "carregarTopJugadors", true);
    xhr.send(null);

    function generaTopRecords(topRecords) {
        topRecords.sort((a, b) => { return b.puntuacio - a.puntuacio }).forEach((user) => {
            let fila = taula.insertRow(-1); // amb insertRow(-1) afegim cada linia al final
            fila.insertCell(0).innerHTML = user.jugador; // A la cel·la 0 afegim el id
            fila.insertCell(1).innerHTML = user.puntuacio; // A la cel·la 1 afegim el nom
        })
    }

    // Listeners

    loginBtn.addEventListener('click', () => {
        if (selectPlayer.value !== 'noClicat') {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    window.location.href = `http://${window.location.host}/inici`;
                }
            };
            xhr.open("GET", "inicialitzarPartida", true);
            xhr.send(null);
        }
    });
}



