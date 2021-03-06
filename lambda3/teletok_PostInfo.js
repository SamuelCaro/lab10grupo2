const mysql = require('mysql2');

exports.handler = (event) => {

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
    var id = event.pathParameters.id;
    var sql = "SELECT p.id as 'id_post', p.description, p.creation_date, u.username, (SELECT count(*) FROM teletok_lambda.post_comment where post_comment.post_id = ?) as 'cantidad'  from post p inner join user u on p.user_id = u.id left join post_comment pc on p.id = pc.post_id where p.id = ?;";
    var param1 = [id, id];
    console.log(id);

    conn.query(sql ,param1, function(err, result) {
        if (err) {
            conn.end(function(err) {
                return {
                    statusCode: 200,
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({
                        "estado": "ok",
                        "msg": result
                    })
                };

            });

        }
        else {
            var PID = result[0].id_post;
            console.log(PID);

            var desc = result[0].description;
            console.log(desc);

            var creation_date = result[0].creation_date;
            console.log(creation_date);

            var username =  result[0].username;
            console.log(username);

            var cantidad = result[0].cantidad;
            console.log(cantidad);


            var sql2 = "SELECT pc.id, pc.message, (SELECT user.username FROM teletok_lambda.user where user.id = pc.user_id) as usuario FROM teletok_lambda.post_comment as pc where post_id = 1;"
            var param2 = [id]

            conn.query(sql2 ,param2, function(err, result) {

                if(err){

                    conn.end(function(err) {
                        return {
                            statusCode: 200,
                            headers: { 'Access-Control-Allow-Origin': '*' },
                            body: JSON.stringify({
                                "estado": "ok",
                                "msg": result
                            })
                        };

                    });

                }else{
                    var texto;
                    texto = {
                        "id": PID,
                        "description": desc ,
                        "creation_date":creation_date,
                        "username": username ,
                        "commentCount": cantidad ,
                        "comments":[] };


                    for (var i = 0; i < cantidad; i++) {
                        texto.comments.append(result[i].id);
                        texto.comments.append(result[i].message);
                        texto.comments.append(result[i].usuario);
                    }
                    conn.end(function(err) {
                        return {
                            statusCode: 200,
                            headers: { 'Access-Control-Allow-Origin': '*' },
                            body: JSON.stringify({
                                "estado": "ok",
                                "msg": result
                            })
                        };

                    });


                }


            });
        }
    });
}