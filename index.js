const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

const router = require('./routes/router');

const { engine } = require('express-handlebars');

const passport = require('./config/passport');

require('dotenv').config();
require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar handlebars
app.engine('handlebars', engine({
  helpers: require('./helpers/handlebars')
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL
  })
}))

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y mensajes flash
app.use(flash());

// Crear nuestro middleware
app.use( (req, res, next) => {
  res.locals.mensajes = req.flash();
  next();
})

app.use('/', router()); 

app.listen(port, () => {
  console.log('El servidor esta corriendo');
})