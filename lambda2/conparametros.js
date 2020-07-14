const mysql = require('mysql');

exports.handler = function(event, context, callback) {

    var response = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    var conn = mysql.createConnection({
        host: "database-1.cxrvdfahxbcn.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "nquauFGlkDFmPxDMC6Rs",
        port: 3306,
        database: "teletok_lambda"

    });


    conn.connect(function(error) {
        if (error) {
            conn.end(function() {

                response.statusCode = 400;
                response.body = JSON.stringify({
                    "estado": "error",
                    "msg": error
                });

                callback(error, response);
            });
        }
        else {
            console.log(event);
            if (event.queryStringParameters != null) {
                var query = event.queryStringParameters.query;
                var sql = "SELECT p.id as 'id', p.description, p.creation_date, u.username, (SELECT count(*) FROM teletok_lambda.post_comment where post_comment.post_id = p.id) as 'commentCount' from post p inner join user u on p.user_id = u.id left join post_comment pc on p.id = pc.post_id where u.username = ? or p.description = ?;";
                var params = [query];

                conn.query(sql, params, function(err, result) {

                    if (err) {
                        conn.end(function() {

                            response.statusCode = 400;
                            response.body = JSON.stringify({
                                "estado": "error insert",
                                "msg": err
                            });

                            callback(error, response);
                        });
                    }

                });

            }
        }
    });

};
