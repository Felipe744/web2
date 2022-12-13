var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.authenticated)
    res.render('login');
  else if (req.session.user.isAdmin) {
    res.render('admin');
  }
  else {
    res.render('admin-semp');
  }
});

module.exports = router;
