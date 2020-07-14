'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "inventariotest"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});

app.listen(3000, function () {
    console.log("servidor levantado exitosamente");
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////LOGICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/ws/post/comment", function (request, response) {
    var token;
    var postId;
    var message;
    token = request.body.token;
    postId = request.body.postId;
    message = request.body.message;
    console.log(nombre);
    console.log(postId);
    console.log(message);
    var sql = "INSERT INTO `inventariotest`.`categoriaequipo` (`nombre`) VALUES (?);";
    var parametros = [nombre];
    conn.query(sql, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            var jason = {
                "idCategoriaEquipo": resultado.insertId,
                "nombre": nombre,
            }
            response.json(jason);
        }
    });

});