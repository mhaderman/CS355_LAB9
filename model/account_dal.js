var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM account;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'CALL account_getinfo(?)';
    var queryData = [account_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.edit = function(account_id, callback) {
    var query = 'CALL account_getallinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        console.log(result);
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE ACCOUNT
    var query = 'INSERT INTO account (first_name, last_name, email) VALUES (?)';

    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, [queryData], function(err, result) {
        var account_id = result.insertId;

        var query = 'INSERT INTO account_company (account_id, company_id) VALUES ?';
        var accountCompanyData = [];
        if (params.company_id.constructor === Array) {
            for (var i = 0; i < params.company_id.length; i++) {
                accountCompanyData.push([account_id, params.company_id[i]]);
            }
        }
        else {
            accountCompanyData.push([account_id, params.company_id]);
        }


        connection.query(query, [accountCompanyData], function(err, result){
            var query = 'INSERT INTO account_skill (account_id, skill_id) VALUES ?';
            var accountSkillData = [];
            if (params.skill_id.constructor === Array) {
                for (var i = 0; i < params.skill_id.length; i++) {
                    accountSkillData.push([account_id, params.skill_id[i]]);
                }
            }
            else {
                accountSkillData.push([account_id, params.skill_id]);
            }


            connection.query(query, [accountSkillData], function(err, result){
                var query = 'INSERT INTO account_school (account_id, school_id) VALUES ?';
                var accountSchoolData = [];
                if (params.school_id.constructor === Array) {
                    for (var i = 0; i < params.school_id.length; i++) {
                        accountSchoolData.push([account_id, params.school_id[i]]);
                    }
                }
                else {
                    accountSchoolData.push([account_id, params.school_id]);
                }

                connection.query(query, [accountSchoolData], function(err, result){
                    callback(err, result);
                });

            });

        });
    });
};

exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM account WHERE account_id = ?';

    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

var accountSkillDeleteAll = function(account_id, callback){
    var query = 'DELETE FROM account_skill WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var accountSchoolDeleteAll = function(account_id, callback){
    var query = 'DELETE FROM account_school WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var accountCompanyDeleteAll = function(account_id, callback){
    var query = 'DELETE FROM account_company WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var accountSkillInsert = function(skill_id, skillIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO account_skill (account_id, skill_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var accountSkillData = [];
    if (skillIdArray.constructor === Array) {
        for (var i = 0; i < skillIdArray.length; i++) {
            accountSkillData.push([account_id, skillIdArray[i]]);
        }
    }
    else {
        accountSkillData.push([account_id, skillIdArray]);
    }
    connection.query(query, [accountSkillData], function(err, result){
        callback(err, result);
    });
};

var accountSchoolInsert = function(school_id, schoolIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO account_school (account_id, school_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var accountSchoolData = [];
    if (schoolIdArray.constructor === Array) {
        for (var i = 0; i < schoolIdArray.length; i++) {
            accountSchoolData.push([account_id, schoolIdArray[i]]);
        }
    }
    else {
        accountSchoolData.push([account_id, schoolIdArray]);
    }
    connection.query(query, [accountSchoolData], function(err, result){
        callback(err, result);
    });
};

var accountCompanyInsert = function(company_id, companyIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO account_company (account_id, company_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var accountCompanyData = [];
    if (companyIdArray.constructor === Array) {
        for (var i = 0; i < companyIdArray.length; i++) {
            accountCompanyData.push([account_id, companyIdArray[i]]);
        }
    }
    else {
        accountCompanyData.push([account_id, companyIdArray]);
    }
    connection.query(query, [accountCompanyData], function(err, result){
        callback(err, result);
    });
};

// potential problem with calling connection.query each time.
exports.update = function(params, callback) {
    var query = 'UPDATE account SET first_name = ?, last_name = ?, email = ? WHERE account_id = ?';
    var queryData = [params.first_name, params.last_name, params.email, params.account_id];

    connection.query(query, queryData, function(err, result) {

        accountSkillDeleteAll(params.account_id, function(err, result){
            accountSkillInsert(params.account_id, params.skill_id, function(err, result){

                    connection.query(query, queryData, function(err, result) {

                        accountSchoolDeleteAll(params.account_id, function(err, result){
                            accountSchoolInsert(params.account_id, params.school_id, function(err, result){

                                connection.query(query, queryData, function(err, result) {

                                    accountCompanyDeleteAll(params.account_id, function(err, result){
                                        accountCompanyInsert(params.account_id, params.company_id, function(err, result){
                                            callback(err, result);

                                        });
                                    });
                                });
                            });
                        });
                    });
            });
        });
    });
};