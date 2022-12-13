var express = require('express');
var router = express.Router();

const UserDAO = require("../model/User")

router.get('/', function(req, res, next) {
  req.session.authenticated = false;
  res.render('login');
});

router.post("/", (req, res) => {
  const {email, senha} = req.body
  req.session.authenticated = false;

  UserDAO.getByEmailAndSenha(email, senha).then((user) => {
    console.log(user.length)
    if (user.length > 0) {
      req.session.authenticated = true;
      req.session.user = { email, isAdmin: user[0].isAdmin };
      res.render('recurso');
    }
    else {
      res.render('users-error');
    }
  })
})

module.exports = router;
