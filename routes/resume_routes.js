var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var school_dal = require('../model/school_dal');
var skill_dal = require('../model/skill_dal');
var company_dal = require('../model/company_dal');
var resumeCompany_dal = require('../model/resumeCompany_dal');
var resumeSchool_dal = require('../model/resumeSchool_dal');

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

//makes multiple calls to DALs and sends their results to the view.
router.get('/add', function(req, res) {

    var account_id = req.query.account_id;
    school_dal.getSchoolsByAccountId(account_id, function(err, schools) {
            if(err) {
                res.send(err);
            }
            else {
              company_dal.getCompaniesByAccountId(account_id, function(err, companies){
                  if(err) {
                      res.send(err);
                  }
                  else {
                      skill_dal.getSkillsByAccountId(account_id, function(err, skills){
                          if(err) {
                              res.send(err);
                          }
                          else {
                              res.render('resume/resumeAdd', {'account_id':account_id, 'schools':schools, 'companies':companies, 'skills':skills});
                          }
                      });
                  }
              });
            }
    });
});

router.get('/insert', function(req, res) {

    resume_dal.insert(req.query, function(err, result){
        var resume_id = result.insertId;
        resumeCompany_dal.insert(resume_id, function(err, result){
            resumeCompany_dal.insert(resume_id, function(err, result){
                res.send("Success!")
            });
        });
    });
});

module.exports = router;