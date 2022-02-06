const http = require("http");
const url = require("url");
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //utilitzem assercions
const ObjectId = require('mongodb').ObjectID;


function iniciar() {
    // ###################################################
    // #                                                 #
    // #                                                 #
    // #                    CLASSES                      #    
    // #                                                 #
    // #                                                 #
    // ###################################################

    // La idea es enviar el array des del front, fer un set tauler i després retornar el tauler amb un get a l'altre jugador
    // Quan tiri el negre (Numero 1), el torn canvia al número 2.
    class Partida {
        torn;
        tauler;

        constructor() {
            this.torn = 1;
            this.tauler = [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
            ];
        }

        get torn() {
            return this.torn;
        }

        set torn(torn) {
            this.torn = torn;
        }
        get tauler() {
            return this.tauler;
        }

        set tauler(tauler) {
            this.tauler = tauler;
        }
    }


    // ###################################################
    // #                                                 #
    // #                                                 #
    // #                   onRequest                     #    
    // #                                                 #
    // #                                                 #
    // ###################################################
    function onRequest(request, response) {
        let sortida;
        const baseURL = request.protocol + '://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        const pathname = reqUrl.pathname;

        // ###################################################
        // #                                                 #
        // #                                                 #
        // #                     /INICI                      #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        if (pathname == '/inici') { // Per a anar al joc
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            fs.readFile('./frontend/index.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });

        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #                   /index.js                     #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else if (pathname == '/index.js') { // per a quan el html del joc demani el arxiu JS amb la lògica
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./frontend/index.js', function (err, sortida) { // Retornem el js
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });
        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #                    /login                       #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else if (pathname == '/login') { // Per a quan el jugador demani el login
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./login/login.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });
        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #                   /login.js                     #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else if (pathname == '/login.js') { // Per a quan el login.html demani el js
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./login/login.js', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });
        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #              /inicialitzarPartida               #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else if (pathname == '/inicialitzarPartida') { // Per a quan el login.html demani el js
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            let partida = new Partida();

        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #              /carregarTopJugadors               #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else if (pathname == '/carregarTopJugadors') { // Per a quan el login.html demani el js
            var ruta = 'mongodb://localhost:27017';
            MongoClient.connect(ruta, (err, client) => {
                assert.equal(null, err);
                console.log("Connexió correcta");
                var db = client.db('othello');

                response.writeHead(200, {
                    "Content-Type": "application/json; charset=utf-8"
                });
                console.log("consulta document a col·lecció othello");

                let cursor = db.collection('othello').find({});

                cursor.toArray((function (err, results) {
                    assert.equal(err, null);
                    if (results != null) {
                        console.log(results)
                        sortida = JSON.stringify(results);
                        response.write(sortida);
                    }
                    response.end();
                }));
            });
        }
        // ###################################################
        // #                                                 #
        // #                                                 #
        // #                   ERROR 404                     #    
        // #                                                 #
        // #                                                 #
        // ###################################################
        else {
            response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8"
            });
            sortida = "404 NOT FOUND";
            response.write(sortida);
            response.end();
        }


    }
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;