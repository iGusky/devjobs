const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/ok',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true
})