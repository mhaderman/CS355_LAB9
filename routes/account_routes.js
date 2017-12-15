var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');
var skill_dal = require('../model/skill_dal');
var company_dal = require('../model/company_dal');
var school_dal = require('../model/school_dal');

router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.getById(req.query.account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

// don't give an eff bout no callback hell
router.get('/add', function(req, res){

    skill_dal.getAll(function(err, skill_result) {
        if (err) {
            res.send(err);
        }
        else {
            school_dal.getAll(function(err, school_result) {
                if (err) {
                    res.send(err);
                }
                else {
                    company_dal.getAll(function(err, company_result) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.render('account/accountAdd', {'school': school_result, 'skill': skill_result, 'company': company_result });
                        }
                    });
                }
            });
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.last_name == null) {
        res.send('A last name must be provided.');
    }
    else if(req.query.first_name == null) {
        res.send('A first name must be provided');
    }
    else if(req.query.school_id == null) {
        res.send('At least one address must be selected');
    }
    else if(req.query.skill_id == null) {
        res.send('At least one skill must be selected');
    }
    else if(req.query.company_id == null) {
        res.send('At least one company must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        account_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.account_id == null) {
        res.send('An account id is required');
    }
    else {
        account_dal.edit(req.query.account_id, function(err, result){
            res.render('account/accountUpdate', {account: result[0], skill: result[1], school: result[2], company: result[3]});
        });
    }

});

router.get('/delete', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/account/all');
            }
        });
    }
});

router.get('/update', function(req, res) {
    account_dal.update(req.query, function(err, result){
        res.redirect(302, '/account/all');
    });
});


module.exports = router;