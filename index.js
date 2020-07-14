const mysql = require('mysql2');

exports.handler = (event, context, callback) => {

    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port: 3306,
        database: "teletok_lambda"
    });






};
