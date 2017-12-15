var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.insert = function (resume_id, callback) {
    var query = 'INSERT INTO resume_company resume_id VALUES ?;';
    var queryData = resume_id;

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};