const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const vacantesController = require('../controllers/vacantes.controller');
const usuariosController = require('../controllers/usuarios.controller');
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

module.exports = () => {
  router.get('/', homeController.mostrarTrabajos)

  -+// Crear vacantes
  router.get('/vacantes/nueva', vacantesController.nuevaVacante);
  router.post('/vacantes/nueva', vacantesController.crearVacante);

  // Mostrar vacante
  router.get('/vacantes/:url', vacantesController.mostrarVacante);

  // Editar vacante
  router.get('/vacantes/editar/:url', vacantesController.editarVacante)
  router.post('/vacantes/editar/:url', vacantesController.updateVacante)

  // Crear cuenta
  router.get('/crear-cuenta', usuariosController.nuevaCuenta);
  router.post('/crear-cuenta', [  
    body('nombre', 'El nombre es obligatorio').notEmpty().escape(),
    body('email', 'El email es obligatorio').notEmpty().isEmail().normalizeEmail(),
    body('password', 'La password es obligatoria').notEmpty().escape(),
    body('confirmar', 'Confirmar password es obligatoria').notEmpty().escape().custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),

    usuariosController.validarRegistro
  ],
  usuariosController.crearCuenta);

  // Autenticar usuarios
  router.get('/iniciar-sesion', usuariosController.iniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);

  return router;
}