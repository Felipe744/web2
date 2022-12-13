var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

var welcomeRouter = require('./routes/welcome');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var recursoRouter = require('./routes/recurso');
var editarUsuarioRouter = require('./routes/editar-usuario');
var facilRouter = require('./routes/facil');
var dificilRouter = require('./routes/dificil');
var historicoRouter = require('./routes/historico');
var adminHistoricoRouter = require('./routes/admin-historico');
var adminRouter = require('./routes/admin');

const mustacheExpress = require("mustache-express");
const store = new session.MemoryStore();

var app = express();
app.use(session({
  secret: "#@A4327Asdzw",
  resave: false,
  saveUninitialized: false,
  store: store
}));
const engine = mustacheExpress();
app.engine("mustache", engine);
  

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(require('./helpers/mongo'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', welcomeRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/recurso', recursoRouter);
app.use('/editarUsuario', editarUsuarioRouter);
app.use('/facil', facilRouter);
app.use('/dificil', dificilRouter);
app.use('/historico', historicoRouter);
app.use('/admin', adminRouter);
app.use('/admin-historico', adminHistoricoRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
