var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAllResumesAndAccount = function(callback) {
    var query = 'SELECT * FROM account a ' +
                'LEFT JOIN resume r ON r.account_id = a.account_id ' +
                'ORDER BY a.first_name asc;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAllUsers = function(callback) {
    var query = 'SELECT DISTINCT * FROM account a ' +
                'ORDER BY a.first_name asc;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getInfoForAdd = function(account_id, callback) {
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        console.log(result);
        callback(err, result);
    });
};