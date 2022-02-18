const passport = require('passport');
const Usuario = require('../models/Usuario');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async ( email, password, done ) => {
  const usuario = await Usuario.findOne({ email });

  if(!usuario) return done( null, false, {
    message: 'Usuario no existente'
  });

  const verificarPassword = usuario.compararPassword(password);
  if(!verificarPassword) return done( null, false, {
    message: 'Password incorrecto'
  });

  // El usuario y la contraseña con correctos
  return done(null, usuario);
  
}));

passport.serializeUser((usuario, done) => done(null, usuario._id));
passport.deserializeUser( async(id, done) => {
  const usuario = await Usuario.findById(id);
  return done( null, usuario );
});

module.exports = passport;