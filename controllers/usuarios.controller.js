const Usuario = require("../models/Usuario");
const { validationResult } = require("express-validator");

exports.nuevaCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crea tu cuenta de DevJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, solo tienes que crear una cuenta",
  });
};

exports.validarRegistro = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    req.flash(
      "error",
      errores.array().map((error) => error.msg)
    );
    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta de DevJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo tienes que crear una cuenta",
      mensajes: req.flash(),
    });
    return;
  }
  return next();
};

exports.crearCuenta = async (req, res, next) => {
  const usuario = new Usuario(req.body);
  try {
    await usuario.save();
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash("error", error);
    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta de DevJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo tienes que crear una cuenta",
      mensajes: req.flash(),
    });
  }
};


exports.iniciarSesion = (req, res) => {
  res.render('iniciar-sesion', {
    nombrePagina: 'Iniciar sesión DevJobs'
  });
}
