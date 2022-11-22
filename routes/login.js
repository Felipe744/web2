var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const UserDAO = require("../model/User")
const {sucess, fail} = require("../helpers/resposta")

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/", (req, res) => {
  const {email, senha} = req.body

  UserDAO.getByEmailAndSenha(email, senha).then((user) => {
    console.log(user.length)
  })
})

module.exports = router;
