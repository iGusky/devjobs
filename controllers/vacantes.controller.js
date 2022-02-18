const Vacante = require('../models/Vacante');

exports.nuevaVacante = (req, res) => {
  res.render('nueva-vacante', {
    nombrePagina: 'Nueva vacante',
    tagline: 'Llena el formulario y publica tu vacante'
  })
}

exports.crearVacante = async ( req, res ) => {
  const vacante = new Vacante( req.body );
  
  // Crear arreglo de skills
  vacante.skills = req.body.skills.split(',');

  // Almacenarlo en ba base de datos
  const nuevaVacante = await vacante.save();
  
  res.redirect(`/vacantes/${nuevaVacante.url}`);
}

exports.mostrarVacante = async( req, res, next ) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).lean();
  if(!vacante) return next();

  res.render('vacante', {
    vacante,
    nombrePagina: vacante.titulo,
    barra: true
  })
}

exports.editarVacante = async(req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url }).lean();
  if(!vacante) return next();
  res.render('editar-vacante', {
    vacante,
    nombrePagina: `Editar - ${vacante.titulo}`
  })
}

exports.updateVacante = async(req, res, next) => {
  const vacanteActualizada = req.body;
  vacanteActualizada.skills = req.body.skills.split(',');


  const vacante = await Vacante.findOneAndUpdate({ url: req.params.url }, vacanteActualizada, {
    new: true,
    runValidators: true
  }).lean();


  res.redirect(`/vacantes/${vacante.url}`);
}