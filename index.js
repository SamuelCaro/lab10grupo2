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
    database: "teletok_lambda"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});


app.get("/ws/post/save", function (request, response) {
    var uno = teletok_PostSave(request, context, callback);
    response.json(uno);
});




app.listen(3000, function () {
    console.log("servidor levantado exitosamente");
});













