var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session.authenticated)
  if (!req.session.authenticated)
    res.render('login');
  else 
    res.render('recurso');
});

module.exports = router;
