const mysql = require('mysql2');

exports.handler = (event, context, callback) => {

    var conn = mysql.createConnection({
        host: "database-1.cxrvdfahxbcn.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "nquauFGlkDFmPxDMC6Rs",
        port: 3306,
        database: "teletok_lambda"

    });

    conn.query("SELECT p.id as 'id', p.description, p.creation_date, u.username, (SELECT count(*) FROM teletok_lambda.post_comment where post_comment.post_id = p.id) as 'commentCount' from post p inner join user u on p.user_id = u.id left join post_comment pc on p.id = pc.post_id", function(err, result) {
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
            conn.end(function(err) {
                callback(null, {
                    statusCode: 200,
                    headers: { 'Access-Control-Allow-Origin': '*', 'content-type': 'application/json'},
                    body: JSON.stringify({
                        "estado": "ok",
                        "msg": result
                    })
                });
            });
        }
    });




};
