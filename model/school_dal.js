var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(school_id, callback) {
    //make sure each strings ends with a whitespace for concentenation
    var query = 'SELECT s.*, a.street, a.zip_code FROM school s ' +
                'LEFT JOIN address a ON s.address_id = a.address_id ' +
                'WHERE school_id = ?';

    var queryData = [school_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.edit = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        console.log(result);
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO school (address_id, school_name) VALUES (?)';

    //won't work unless you use a multidimensional array
    var queryData = [[params.address_id, params.school_name]];

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.delete = function(school_id, callback) {
    var query = 'DELETE FROM school WHERE school_id = ?';

    var queryData = [school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};