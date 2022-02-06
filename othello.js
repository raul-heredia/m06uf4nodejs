const http = require("http");
const url = require("url");
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //utilitzem assercions
const ObjectId = require('mongodb').ObjectID;


function iniciar() {
    function onRequest(request, response) {
        let sortida;
        const baseURL = request.protocol + '://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        const pathname = reqUrl.pathname;

        if (pathname == '/inici') { // per a anar al joc
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

        } else if (pathname == '/index.js') { // per a quan el html del joc demani el arxiu JS amb la lògica
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
        } else if (pathname == '/login') { // Per a quan el jugador demani el login
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
        } else if (pathname == '/login.js') { // Per a quan el login.html demani el js
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
        } else if (pathname == '/carregarTopJugadors') { // Per a quan el login.html demani el js
            var ruta = 'mongodb://localhost:27017';
            MongoClient.connect(ruta, (err, client) => {
                assert.equal(null, err);
                console.log("Connexió correcta");
                var db = client.db('othello');

                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                console.log("consulta document a col·lecció othello");

                let cursor = db.collection('othello').find({});

                cursor.toArray((function (err, results) {
                    assert.equal(err, null);
                    if (results != null) {
                        results.forEach((doc) => {
                            sortida = JSON.stringify(doc);
                            response.write(sortida);
                        });
                    }
                    response.end();
                }));
            });
        } else {
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