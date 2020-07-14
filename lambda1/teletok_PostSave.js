const mysql = require('mysql2');

exports.handler = (event, context, callback) => {

    var conn = mysql.createConnection({
        host: "lab8.cdqq7iqiqvi5.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "HaEhgfK7tAhNbmWQUdpi",
        port: 3306,
        database: "teletok_lambda"
    });



    conn.connect(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Conexión exitosa a base de datos");
        }
    });


    var token = event.token;
    console.log(token);
    var desc = event.description;
    console.log(desc);
    conn.query("SELECT * FROM teletok_lambda.token where token.`code` = ?" ,token, function(err, result) {
        if (err) {
            conn.end();
            callback({
                statusCode: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({
                    "estado": "error",
                    "msg": err
                })
            });
        }
        else {
            var token = result[0].code;
            console.log(token);
            var user_id = result[0].user_id;
            console.log(user_id);
            conn.query("SELECT now() as ahora", function(err, result) {
                if (err) {
                    conn.end();
                    callback({
                        statusCode: 200,
                        headers: { 'Access-Control-Allow-Origin': '*' },
                        body: JSON.stringify({
                            "estado": "error",
                            "msg": err
                        })
                    });
                }else{
                    var fecha = result[0].ahora;
                    var params = [desc, fecha, user_id];
                    console.log(fecha);
                    console.log(params);
                    conn.query("INSERT INTO `teletok_lambda`.`post` (`description`, `creation_date`, `user_id`) VALUES (?, ?, ?)", params, function(err,result){
                        if (err) {
                            conn.end();
                            callback({
                                statusCode: 200,
                                headers: { 'Access-Control-Allow-Origin': '*' },
                                body: JSON.stringify({
                                    "estado": "error",
                                    "msg": err
                                })
                            });
                        }else{
                            var id = result.insertId;
                            console.log(id);
                            conn.end(function(err) {
                                if(err){
                                    callback(err, {
                                        statusCode: 400,
                                        headers: { 'Access-Control-Allow-Origin': '*' },
                                        body: JSON.stringify({
                                            "error": "error al ultimo"
                                        })
                                    });
                                }else{
                                    callback(null, {
                                        statusCode: 200,
                                        headers: { 'Access-Control-Allow-Origin': '*' },
                                        body: JSON.stringify({
                                            "postId": id,
                                            "status": "POST_CREATED"
                                        })
                                    });
                                }
                            });
                        }});
                }});
        }});

};