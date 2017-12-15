var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(address_id, callback) {
    var query = 'SELECT a.* FROM address a ' +
                'WHERE a.address_id = ?';
    var queryData = [address_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.delete = function(address_id, callback) {
    var query = 'DELETE FROM address WHERE address_id = ?';

    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.edit = function(address_id, callback) {
    var query = 'CALL address_getinfo(?)';
    var queryData = [address_id];

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};


exports.update = function(params, callback) {
    var query = 'UPDATE address SET street = ?, zip_code = ? WHERE address_id = ?';
    var queryData = [params.street, params.zip_code, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO address (street, zip_code) VALUES (?)';

    //won't work unless you use a multidimensional array
    var queryData = [[params.street, params.zip_code]];

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};