var express = require('express');
var router = express.Router();

const OperacaoDAO = require("../model/Operacao")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  if (!req.session.authenticated)
    res.render('login');
  else {
    let valor1 = Math.floor(Math.random() * 10)
    let valor2 = Math.floor(Math.random() * 10)
    let op = "-"

    if (valor1 < 5)
      op = "+"

    res.render('facil', {
      valor1: valor1,
      valor2: valor2,
      op: op
    });
  }
});

router.post("/", (req, res) => {
  const {valor1, valor2, resultado, op} = req.body
  let correcao = (parseInt(valor1) - parseInt(valor2)) === parseInt(resultado) ? "Correto" : "Errado"
  let  valorCorreto = parseInt(valor1) - parseInt(valor2)

  console.log(req.body)

  if (op !== "-") {
    correcao = (parseInt(valor1) + parseInt(valor2)) === parseInt(resultado) ? "Correto" : "Errado"
    valorCorreto = parseInt(valor1) + parseInt(valor2)
  }

  console.log(req.body)

  OperacaoDAO.save(req.session.user.email, valor1, valor2, resultado, "Facil", correcao).then(op => {
    if (correcao === "Correto")
      res.render('correto');
    else
      res.render('errado',{
        valorCorreto: valorCorreto
      });
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
