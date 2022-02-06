window.onload = main;



function main() {

    // Variables
    const loginBtn = document.getElementById('loginBtn');
    const selectPlayer = document.getElementById('selectJugador')
    let xhr = new XMLHttpRequest();
    // Funcions


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            let resposta = this.response;
            console.log(resposta);
            console.log(JSON.parse(resposta));
        }
    };
    xhr.open("GET", "carregarTopJugadors", true);
    xhr.send(null);


    /* xhr.open('GET', 'carregarTopJugadors', true);
    xhr.onload = () => {
        if (this.status == 200) {
            let jugadors = (this.response);
            let informacioP = jugadors.split();
            console.log(informacioP) */
    /* let table = document.createElement("TABLE");
    table.border = "1";
    let columnCount = informacioP[0].length;

    let row = table.insertRow(-1);
    for (let i = 0; i < columnCount; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = informacioP[0][i];
        row.appendChild(headerCell);
    }

    for (let i = 1; i < informacioP.length; i++) {

        row = table.insertRow(-1);
        for (let j = 0; j < columnCount; j++) {
            let cell = row.insertCell(-1);
            cell.innerHTML = informacioP[i][j];
        }
    }

    let dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table); */
    /* }
        };
    xhr.send(); */

    // Listeners

    loginBtn.addEventListener('click', () => {
        if (selectPlayer.value !== 'noClicat') window.location.href = "http://localhost:8888/inici";
    });
}



