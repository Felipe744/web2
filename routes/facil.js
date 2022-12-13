var express = require('express');
var router = express.Router();

const OperacaoDAO = require("../model/Operacao")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  if (!req.session.authenticated)
    res.render('login');
  else {
    res.render('facil', {
      valor1: Math.floor(Math.random() * 10),
      valor2: Math.floor(Math.random() * 10)
    });
  }
});

router.post("/", (req, res) => {
  const {valor1, valor2, resultado} = req.body
  const correcao = (parseInt(valor1) + parseInt(valor2)) === parseInt(resultado) ? "Correto" : "Errado"

  OperacaoDAO.save(req.session.user.email, valor1, valor2, resultado, "Facil", correcao).then(op => {
    if ((parseInt(valor1) + parseInt(valor2)) === parseInt(resultado))
      res.render('correto');
    else
      res.render('errado');
  }).catch(err => {
    res.status(500).json(fail("Falha ao inserir o nova operacao!"))
  })
})

router.get("/listOperacoes", (req, res) => {
  OperacaoDAO.list().then((user) => {
      res.json(sucess(user, "list"))
      console.log(user)
      console.log(req.session.authenticated)
  })
})

module.exports = router;
