var express = require('express');
var router = express.Router();

const UserDAO = require("../model/User")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  if (!req.session.authenticated)
    res.render('login');
  else {
    UserDAO.getByEmail(req.session.user.email).then((user) => {
      if (user.length > 0) {
        res.render('editar-usuario', { 
          nome: user[0].nome,
          idade: user[0].idade,
          senha: user[0].senha
        });
      }
    })
  }
});

router.post("/", (req, res) => {
  const {nome, idade, senha} = req.body

  if (!nome || !idade || !senha) {
    UserDAO.getByEmail(req.session.user.email).then((user) => {
      if (user.length > 0) {
        res.render('editar-usuario-error', { 
          nome: user[0].nome,
          idade: user[0].idade,
          senha: user[0].senha
        });
      }
    })
  }
  else {
    UserDAO.update(req.session.user.email, {nome, idade, senha}).then(user => {
      res.render('recurso');
    }).catch(err => {
      res.status(500).json(fail("Falha ao editar usuário!"))
    })
  }
})

module.exports = router;
