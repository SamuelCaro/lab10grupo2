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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
////LOGICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    app.post("/ws/post/comment", function (request, response) {

        var token = request.body.token;
        var postId = request.body.postId;
        var message = request.body.message;
        console.log(nombre);
        console.log(postId);
        console.log(message);
        var comprobacion = "SELECT * FROM token WHERE code= ?";
        var parametro1=[token];
        conn.query(comprobacion,parametro1);

        if (comprobacion != null) {
            var idmen = "SELECT u.id FROM teletok_lambda.token t INNER JOIN teletok_lambda.user u ON (t.user_id=u.id) WHERE t.code= ?";
            var parametro2=[token];
            conn.query(idmen,parametro2);

            var sql = "INSERT INTO `teletok_lambda`.`post_comment` (`id`, `message`, `user_id`, `post_id`) VALUES ('',?, ?, ?)";
            var parametros = [message, idmen, postId];
            conn.query(sql, parametros, function (err, resultado) {
                if (err) {
                    console.log(err);
                } else {
                    var jason = {
                        statusCode: 200,
                        datos: {
                            "commentId": resultado.insertId,
                            "status": "COMMENT_CREATED"
                        }
                    }
                    response.json(jason);
                }
            });

        } else {
            var jason = {
                statusCode: 400,
                datos: {"error": "TOKEN_INVALID"}
            }
            response.json(jason);
        }


    });


}





