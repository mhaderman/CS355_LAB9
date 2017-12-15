var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var school_dal = require('../model/school_dal');
var skill_dal = require('../model/skill_dal');
var company_dal = require('../model/company_dal');

router.get('/all', function(req, res) {
    resume_dal.getAllResumesAndAccount(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });
});

router.get('/add/selectuser', function(req, res) {
    resume_dal.getAllUsers(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeSelectUser', { 'result':result });
        }
    });
});

router.get('/add', function(req, res) {
    resume_dal.getAllResumesAndAccount(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeAdd', { 'account': result[0], 'skill': result[0], 'school': result[1], 'company': result[2] });
        }
    });
});

module.exports = router;