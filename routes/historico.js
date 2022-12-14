var express = require('express');
var router = express.Router();

const OperacaoDAO = require("../model/Operacao")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  if (!req.session.authenticated)
    res.render('login');
  else {
    OperacaoDAO.getByEmail(req.session.user.email).then((op) => {
      const acertosFacil = op.filter(o => o.dificuldade === "Facil").filter(o => o.correcao === "Correto").length
      const errosFacil = op.filter(o => o.dificuldade === "Facil").filter(o => o.correcao === "Errado").length
      const AcertosDificil = op.filter(o => o.dificuldade === "Dificil").filter(o => o.correcao === "Correto").length
      const errosDificil = op.filter(o => o.dificuldade === "Dificil").filter(o => o.correcao === "Errado").length
      res.render('historico', {
        acertosFacil,
        errosFacil,
        AcertosDificil,
        errosDificil,
        op: op.reverse(),
        jogadas: op.length,
        email: req.session.user.email
      });
      console.log(op);
    })
  }
});

module.exports = router;
