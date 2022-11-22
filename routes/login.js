var express = require('express');
var router = express.Router();

const UserDAO = require("../model/User")

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/", (req, res) => {
  const {email, senha} = req.body
  req.session.authenticated = false;

  UserDAO.getByEmailAndSenha(email, senha).then((user) => {
    console.log(user.length)
    if (user.length > 0) {
      req.session.authenticated = true;
      req.session.user = { email };
      res.send(req.session);
    }
    else {
      res.status(403).json({ msg: 'Credenciais Invalidas' });
    }
    
  })
})

module.exports = router;
