var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');
var address_dal = require('../model/address_dal');


// View All address
router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', { 'result':result });
        }
    });

});

// View the address for the given id
router.get('/', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.getById(req.query.address_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('address/addressViewById', {'result': result});
            }
        });
    }
});

// Return the add a new address form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('address/addressAdd', {'address': result});
        }
    });
});


router.get('/insert', function(req, res){

    address_dal.insert(req.query, function(err,result) {
        if (err) {
            console.log(err)
            res.send(err);
        }
        else {
            //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
            res.redirect(302, '/address/all');
        }
    });
});

router.get('/edit', function(req, res){
    if(req.query.address_id == null) {
        res.send('An address id is required');
    }
    else {
        address_dal.edit(req.query.address_id, function(err, result){
            //result needed to be a multi-dimensional array
            res.render('address/addressUpdate', {address: result[0][0]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.address_id == null) {
        res.send('A address id is required');
    }
    else {
        address_dal.getById(req.query.address_id, function(err, address){
            address_dal.getAll(function(err, address) {
                res.render('address/addressUpdate', {address: address});
            });
        });
    }

});

router.get('/update', function(req, res) {
    address_dal.update(req.query, function(err, result){
        res.redirect(302, '/address/all');
    });
});

// Delete a company for the given address_id
router.get('/delete', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.delete(req.query.address_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});

module.exports = router;
