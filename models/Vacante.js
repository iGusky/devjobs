const { Schema, model } = require('mongoose');
const slug = require('slug');
const shortId = require('shortid');

const VacanteSchema = new Schema({
  titulo: {
    type: String,
    required: 'El nombre de la vacante es obligatorio',
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  ubicacion: {
    type: String,
    trim: true,
    required: 'La ubicación es obligatoria'
  },
  salario: {
    type: String,
    default: 0,
    trim: true
  },
  contrato: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  skills: {
    type: [String],
    candidatos: [{
      nombre: String,
      email: String,
      cv: String
    }]
  }
});

VacanteSchema.pre('save', function(next) {
  const url = slug(this.titulo);
  this.url = `${url}-${shortId.generate()}`
  next();
})

module.exports = model('Vacante', VacanteSchema);