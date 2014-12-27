require('node-jsx').install({harmony: true});

var fs = require("fs");
var React = require("react/addons");

var Router = require("react-router");

var app_router = require("../../src/AppRouter");
var router = require('express').Router({caseSensitive: true, strict: true});
var Question = require("../api/models/Question");

//only read on startup
var template = fs.readFileSync(__dirname + "/../../public/app.html", {encoding:'utf8'});
//wildcard route to pass to react client app

function _render(req, res, options) {
  var title = (options && options.title) || '市長給問嗎！最後一役 政策問答大亂鬥';
  var description = (options && options.description) || '看了政見有滿腹疑問，想要進一步追問或釐清？覺得政策不可行，想要挑戰候選人？「市長給問嗎！最後一役」，邀請你把所有還來不及說出口的疑問和質疑一次提出！' ;

  Router.renderRoutesToString(app_router, req.originalUrl, function(error, abortReason, string){
    var html = template.replace(/\{\{body\}\}/, string);
    html = html.replace(/\{\{title\}\}/, title);
    html = html.replace(/\{\{description\}\}/, description);
    html = html.replace(/\{\{initialData\}\}/, JSON.stringify({}));
    return res.send(html);
  });
}

router.get(['/','/qa', 'terms', '/contact'], function(req, res) {
  return _render(req, res);
});

router.get('/candidates/:candidateId/policies', function (req, res) {
  var candidateId = req.param('candidateId');
  if ('5' === candidateId || '6' === candidateId || '7' === candidateId) {
    return _render(req, res);
  } else {
    return res.redirect('/');
  }

});

router.get('/candidates/:candidateId/policies/:policyId?', function (req, res) {
  var candidateId = req.param('candidateId');
  var policyId = ~~req.param('policyId');
  var qid = req.query.qid;
  var options = {};
  if(qid) {
    return Question
      .findOne({id: qid})
      .exec(function (err, question) {
        return _render(req, res, {
          title: question.title,
          description: question.content
        });
      });
  }
  var policies = JSON.parse(fs.readFileSync(__dirname + '/policies.json', {encoding:'utf8'}));
  var policy = policies[candidateId][policyId];
  if ('1' === candidateId && policyId >= 1 && policyId <= 4) {
    console.log(policy);
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
  }
  if ('2' === candidateId && policyId >= 1 && policyId <= 4) {
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
  }
  if ('3' === candidateId && policyId >=1 && policyId <= 4) {
    return _render(req, res, {
      title: policy.title,
      description: String(policy.content).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gi,' ').substring(0,200)
    });
  }
  return res.redirect("/");
});

router.get('/candidates/:candidateId/questions', function (req, res) {
  var candidateId = req.param('candidateId');

  if ('5' === candidateId || '6' === candidateId || '7' === candidateId) {
    return _render(req, res);
  }
  return res.redirect("/");
});


router.get('*', function (req, res) {
  return res.redirect('/');
});

module.exports = router;