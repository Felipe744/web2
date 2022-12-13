var express = require('express');
var router = express.Router();

const UserDAO = require("../model/User")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  res.render('users', { title: 'Express' });
});

router.post("/", (req, res) => {
  const {nome, idade, email, senha} = req.body

  UserDAO.getByEmail(email).then((user) => {
    if (user.length > 0) {
      res.render('users-email-exists');
    }
    else if (!nome || !idade || !email || !senha) {
      res.render('users-error');
    }
    else {
      UserDAO.save(nome, idade, email, senha).then(user => {
        res.render('login');
      }).catch(err => {
        res.status(500).json(fail("Falha ao inserir o novo usuário!"))
      })
    }
  })
})

router.get("/listUsers", (req, res) => {
  UserDAO.list().then((user) => {
      res.json(sucess(user, "list"))
      console.log(user)
      console.log(req.session.authenticated)
  })
})

module.exports = router;
